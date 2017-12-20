const express = require('express');
const router = express.Router();
const json2csv = require('json2csv');
const fs = require('fs');

const { Experiment, UserExperiment, Mouse, Cage, TreatmentGroup, Session, Sequelize } = require('./models');
const Op = Sequelize.Op;

router.get('/experiments', (req, res) => {
  Experiment.findAll({ include: {
    model: UserExperiment, where: { userId: req.user.id }
  }}).then(resp => {
    res.json(resp);
  }).catch(e => console.log(e));
});

router.post('/experiment', (req, res) => {
  Experiment.create(req.body)
    .then(resp => UserExperiment.create({
      userId: req.user.id,
      experimentId: resp.id,
      isAdmin: true
    })).then(resp => res.send({ success: true, response: resp }))
    .catch(e => console.log(e));
});

router.post('/join/experiment', (req, res) => {
  Experiment.findById(req.body.id, { include: {
    model: UserExperiment,
    required: false,
    where: { userId: req.user.id }
  } }).then(resp => {
    if (!resp) {
      res.json({
        success: false,
        error: "Experiment does not exist"
      });
    } else if (req.body.password !== resp.password) {
      res.json({
        success: false,
        error: "Incorrect Password"
      });
    } else if (resp.user_experiments[0]) {
      res.json({
        success: false,
        error: "You're already in this experiment"
      });
    } else {
      UserExperiment.create({
        userId: req.user.id,
        experimentId: resp.id
      }).then(() => res.json({ success: true }));
    }
  }).catch(e => console.log(e));
});


// MIDDLEWARE TO CHECK IF A USER HAS ACCESS TO A PARTICULAR EXPERIMENT. THE ADMIN STATUS OF THE USER FOR THE EXPERIMENT IS ALSO STORED AS req.admin
router.use('/experiment/:id', (req, res, next) => {
  UserExperiment.findOne({
    where: {
      experimentId: req.params.id,
      userId: req.user.id
    }
  })
    .then((resp)=>{
      if(!resp.dataValues) {
        res.send(false);
      }
      else{
        req.isAdmin = resp.dataValues.isAdmin;
        next();
      }
    })
    .catch((err)=>{
      console.log('Server Error');
      res.status(500).send(err);
    });
});

router.get('/experiment/:id/:type/:typeId', (req, res) => {
  switch (req.params.type) {
    case 'group':
      TreatmentGroup.findById(req.params.typeId).then(resp => {
        res.send(resp);
      }).catch(e => console.log(e));
      break;
    case 'cage':
      Cage.findById(req.params.typeId).then(resp => {
        res.send(resp);
      }).catch(e => console.log(e));
      break;
    case 'mouse':
      Mouse.findById(req.params.typeId).then(resp => {
        res.send(resp);
      }).catch(e => console.log(e));
      break;
    default:
      res.send(false);
  }
});

router.get('/experiment/:id', (req, res) => {
  var yesterday = new Date();
  yesterday = new Date(yesterday.setTime(yesterday.getTime() - 86400000));
  Experiment.findById(req.params.id, {
    attributes: ['id', 'createdAt', 'name', 'description', 'minDailySessions'],
    include: [
      {
        model: TreatmentGroup,
        required: false,
        include: [
          {
            model: Cage,
            required: false,
            include: [
              {
                model: Mouse,
                include: [
                  {
                    model: Session,
                    required: false,
                    attributes: ['id'],
                    where: {
                      createdAt: {[Op.gte]: yesterday}
                    }
                  }
                ]
              },
              {
                model: Session,
                required: false,
                attributes: ['id'],
                where: {
                  createdAt: {[Op.gte]: yesterday}
                }
              }
            ]
          },
          {
            model: Session,
            required: false,
            attributes: ['id'],
            where: {
              createdAt: {[Op.gte]: yesterday}
            }
          }
        ]
      }
    ]
  }).then(resp => {
    res.send({
      experiment: resp,
      isAdmin: req.isAdmin
    });
  }).catch(e => console.log(e));
});

router.get('/experiment/:id/sessions', (req, res)=>{
  Session.findAll({
    where: { experimentId: req.params.id },
    include: [
      {
        model: Mouse
      },
      {
        model: Cage
      },
      {
        model: TreatmentGroup
      }
    ]})
    .then((resp)=>{
      const data = resp.map(sesh => ({
        "id": sesh.id,
        "revolutions": sesh.revolutions,
        "start_time": sesh.start_time,
        "time_elapse(minutes)": (sesh.end_time.getTime() - sesh.start_time.getTime()) / 60000,
        "pace": (sesh.end_time.getTime() - sesh.start_time.getTime()) / 60000 / sesh.revolutions,
        "mouse_id": sesh.mouse.id,
        "mouse_sex": sesh.mouse.sex,
        "mouse_age": sesh.mouse.age,
        "cage": sesh.cage.name,
        "treatment_group": sesh.treatment_group.name
      }));
      const file = json2csv({ data, fields: data[0] ? Object.keys(data[0]) : ["no sessions available"] });
      fs.writeFile(__dirname + '/data.csv', file, err => console.log(err));
      res.sendfile('./data.csv');
    })
    .catch((err)=>{
      res.status(400).send(err);
      console.log(err);
    });
});

router.post('/experiment/:id/join/admin', (req, res) => {
  Experiment.findById(req.params.id).then(resp => {
    if (resp.adminPassword === req.body.password) {
      return UserExperiment.update({
        isAdmin: true
      }, {
        where: {
          userId: req.user.id,
          experimentId: req.params.id
        }
      });
    }
    res.json({
      success: false,
      error: 'Incorrect Admin Password'
    });
    return null;
  }).then(() => res.json({ success: true })).catch(e => res.json({
    success: false,
    error: e.errors[0].message
  }));
});

// MIDDLEWARE TO CHECK IF USER HAS ADMINISTRATIVE RIGHTS OVER AN EXPERIMENT
router.use('/experiment/:id', (req, res, next)=>{
  if(req.isAdmin) {
    next();
  }
  else{
    res.status(400).send('You do not have administrative rights to this experiment.');
  }
});

router.get('/experiment/:id/edit', (req, res)=>{
  Experiment.findById(req.params.id, {
    attributes: ['id', 'name', 'description']
  })
    .then(resp => {
      res.send({
        experiment: resp
      });
    }).catch(e => console.log(e));
});

router.post('/experiment/:id/edit', (req, res) => {
  Experiment.update(req.body, { where: { id: req.params.id }})
    .then(resp => res.json({ success: true, respnse: resp }))
    .catch(e => res.json({ success: false, error: e.errors[0].message }));
});
module.exports = router;
