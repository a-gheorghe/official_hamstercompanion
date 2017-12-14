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

router.get('/experiment/:id', (req, res) => {
  var yesterday = new Date();
  yesterday = new Date(yesterday.setTime(yesterday.getTime() - 86400000));
  Experiment.findById(req.params.id, {
    attributes: ['id', 'createdAt', 'name', 'description', 'minDailySessions'],
    include: [
      {
        model: UserExperiment,
        where: { userId: req.user.id },
      },
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
      console.log('*******************', resp, '***************');
      res.json(resp);
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

module.exports = router;
