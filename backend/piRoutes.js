const express = require('express');
const router = express.Router();
const { Session, Mouse, Cage, TreatmentGroup, Experiment } = require('./models');

router.post('/new/session', (req, res) => {
  Mouse.findById(req.body.mouseId, {
    attributes: ['id', 'cageId', 'treatmentGroupId', 'experimentId']
  })
  .then((resp)=>{
    if (!resp) {
      res.send('Error: specified mouse does not exist');
      return false;
    }
    var newSession = Object.assign({}, req.body, {
      experimentId: resp.experimentId,
      treatmentGroupId: resp.treatmentGroupId,
      cageId: resp.cageId
    });
    console.log("New session to add:", newSession);
    return Session.create(newSession);
  })
  .then(()=>{
    res.send('New session created!');
  })
  .catch((e) => {
    res.send('Internal server error');
    console.log(e);});


  Session.create(req.body).then(resp => {
    console.log('RESPONSE', resp);
    res.send('Post request received!');
  }).catch(e => console.log(e));
});

router.post('/new/mouse', (req, res) => {
  Cage.findById(req.body.cageId, {
    attributes: ['id', 'treatmentGroupId', 'experimentId']
  })
  .then((resp)=>{
    if (!resp) {
      res.send('Error: specified cage does not exist');
      return false;
    }
    var newMouse = Object.assign({}, req.body, {
      experimentId: resp.experimentId,
      treatmentGroupId: resp.treatmentGroupId
    });
    return Mouse.create(newMouse);
  })
  .then(()=>{
    res.send('New mouse created!');
  })
  .catch((e) => {
    res.send('Internal server error');
    console.log(e);
  });
});

router.get('/led', (req, res) => {
  res.send('Hello World!');
});

module.exports = router;
