const express = require('express');
const router = express.Router();

const { Experiment, UserExperiment, User, Mouse, Cage, TreatmentGroup  } = require('./models');

router.get('/experiments', (req, res) => {
  Experiment.findAll({ include: {
    model: UserExperiment, where: { userId: req.user.id }
  }}).then(resp => {
    res.json(resp);
  }).catch(e => console.log(e));
});

router.get('/experiment/:id', (req, res) => {
  Experiment.findById(req.params.id, {
    attributes: ['id', 'createdAt', 'name', 'description'],
    include: [
      {
        model: UserExperiment,
        where: { userId: req.user.id },
      },
      {
        model: TreatmentGroup,
        include: {
          model: Cage,
          include: {
            model: Mouse
          }
        }
      }
    ]}).then(resp => {
      console.log('*******************', resp, '***************');
      res.json(resp);
    }).catch(e => console.log(e));
});

router.post('/experiment', (req, res) => {
  Experiment.create(req.body)
    .then(resp => res.send({ success: true, response: resp }))
    .catch(e => console.log(e));
});

router.post('/join/experiment', (req, res) => {
  Experiment.findById(req.body.id).then(resp => {
    if (req.body.password === resp.password) {return UserExperiment.create({
      userId: req.user.id,
      experimentId: req.body.id
    });} return res.send(false);
  }).then(resp => res.send(resp)).catch(e => console.log(e));
});

module.exports = router;
