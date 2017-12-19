import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import Experiments from '../components/Experiments';
import Dashboard from '../components/Dashboard';
import EditExperiment from '../components/EditExperiment';
// import ExperimentData from '../components/ExperimentData';
import TreatmentGroups from '../components/TreatmentGroups';
import Cages from '../components/Cages';
import Mice from '../components/Mice';
import '../components/styles/temp.css';

const UserContainer = () => {
  return (
    <div id="user-container">
      <h1>Hamster Companion</h1>
      <Switch>
        <Route path="/new/experiment" component={EditExperiment} />
        <Route path="/experiment/:id/edit" component={EditExperiment} />
        {/* <Route path="/experiment/:id/data" component={ExperimentData} /> */}
        <Route path="/experiment/:id" exact component={Dashboard} />
        <Route path="/experiment/:id/groups" component={TreatmentGroups} />
        <Route path="/experiment/:id/cages" component={Cages} />
        <Route path="/experiment/:id/mice" component={Mice} />
        <Route path="/" exact component={Experiments} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default UserContainer;
