const express = require('express');
const router = express.Router();

const { Experiment, UserExperiment, Mouse, Cage, TreatmentGroup, Session, Sequelize, sequelize  } = require('./models');
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
      experimentId: resp.id
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
    ]}).then(resp => {
      res.send({
        experiment: resp,
        isAdmin: req.isAdmin
      });
    }).catch(e => console.log(e));
});

router.get('/experiment/:id/sessions', (req, res)=>{
  var now = new Date();
  now = new Date(now.setTime(now.getTime() - 86400000));
  Experiment.findById(1, {
    attributes: ['id', 'name'],
    include: [
      {
        model: Session,
        attributes: ['id'],
        where: {
          createdAt: {
            [Op.gte]: now
          }
        }
      }
    ]})
    .then((resp)=>{
      res.send(resp.dataValues);
    })
    .catch((err)=>{
      res.status(400).send(err);
      console.log(err);
    });
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


module.exports = router;
