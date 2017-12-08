import React from 'react';
import { Route } from 'react-router';
import Experiments from '../components/Experiments';
// import ViewExperiment from '../components/ViewExperiment';

const UserContainer = () => {
  return (
    <div>
      <h1>Hamster Companion</h1>
      <Route path="/experiments" component={Experiments} />
      {/* <Route path="/viewExperiment" component={ViewExperiment} /> */}
    </div>
  );
};

export default UserContainer;
