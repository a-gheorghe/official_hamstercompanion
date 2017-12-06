import React from 'react';
import { Route } from 'react-router';
import Register from '../components/Register';
import Login from '../components/Login';
import Experiments from '../components/Experiments';

const AppContainer = () => {
  return (
    <div>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/experiments" component={Experiments} />
    </div>
  );
};

export default AppContainer;
