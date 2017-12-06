import React from 'react';
import { Route, Redirect } from 'react-router';
import Register from '../components/Register';
import Login from '../components/Login';
import Experiments from '../components/Experiments';

const AppContainer = () => {
  return (
    <div>
      <h1>Hamster Companion</h1>
      {true ? <Redirect to="/login" /> : <div>hellllllo</div>}
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/experiments" component={Experiments} />
    </div>
  );
};

export default AppContainer;
