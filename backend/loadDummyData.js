const models = require('./models');
const userData = require('./data/users');
const cageData = require('./data/cages');
const mouseData = require('./data/mice');
const experimentData = require('./data/experiments');
const sessionData = require('./data/session');
const userExperimentData = require('./data/userExperiment');

models.sequelize.sync({ force: true })
.then(()=>{
  return models.User.bulkCreate(userData);
})
.then(()=>{
  return models.Experiment.bulkCreate(experimentData);
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
