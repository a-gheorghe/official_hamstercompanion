const models = require('./models');
const userData = require('./data/users');
const experimentData = require('./data/experiments');
const treatmentGroupData = require('./data/treatmentGroups');
const cageData = require('./data/cages');
const mouseData = require('./data/mice');

const sessionData = require('./data/sessions');
const userExperimentData = require('./data/userExperiments');

models.sequelize.sync({ force: true })
  .then(()=>{
    return models.User.bulkCreate(userData);
  })
  .then(()=>{
    return models.Experiment.bulkCreate(experimentData);
  })
  .then(()=>{
    return models.TreatmentGroup.bulkCreate(treatmentGroupData);
  })
  .then(()=>{
    return models.Cage.bulkCreate(cageData);
  })
  .then(()=>{
    return models.Mouse.bulkCreate(mouseData);
  })
  .then(()=>{
    return models.UserExperiment.bulkCreate(userExperimentData);
  })
  .then(()=>{
    return models.Session.bulkCreate(sessionData);
  })
  .then(()=>{
    console.log('Data loaded.');
    process.exit(0);
  })
  .catch((err)=>{
    console.log('Error loading data:', err);
    process.exit(1);
  });
