import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import Experiments from '../components/Experiments';
import Dashboard from '../components/Dashboard';
import EditExperiment from '../components/EditExperiment';
import '../components/styles/temp.css';

const UserContainer = () => {
  return (
    <div id="user-container">
      <h1>Hamster Companion</h1>
      <Switch>
        <Route path="/new/experiment" component={EditExperiment} />
        <Route path="/experiment/:id" component={Dashboard} />
        <Route path="/" exact component={Experiments} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default UserContainer;
