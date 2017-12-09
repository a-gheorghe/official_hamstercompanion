import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import Experiments from '../components/Experiments';
import ViewExperiment from '../components/ViewExperiment';
import NewExperiment from '../components/NewExperiment';

const UserContainer = () => {
  return (
    <div>
      <h1>Hamster Companion</h1>
      <Switch>
        <Route path="/new/experiment" component={NewExperiment} />
        <Route path="/experiment/:id" component={ViewExperiment} />
        <Route path="/" exact component={Experiments} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default UserContainer;
