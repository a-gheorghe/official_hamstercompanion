const express = require('express');
const router = express.Router();
const { Session, Mouse, Cage, TreatmentGroup, Experiment } = require('./models');

router.post('/new/session', (req, res) => {
  console.log(req.body);
  Session.create(req.body).then(resp => {
    console.log('RESPONSE', resp);
    res.send('Post request received!');
  }).catch(e => console.log(e));
});

router.post('/new/mouse', (req, res) => {
  console.log('inside adding new mouse');
  console.log(req.body);
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
    console.log("New mouse to add:", newMouse);
    return Mouse.create(newMouse);
  })
  .then((resp)=>{
    console.log('RESPONSE', resp);
    res.send('New mouse created!');
  })
  .catch((e) => {
    res.send('Internal server error');
    console.log(e);});
});

router.get('/led', (req, res) => {
  res.send('Hello World!');
});

module.exports = router;
