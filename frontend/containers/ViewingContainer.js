import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import Register from '../components/Register';
import Login from '../components/Login';

const ViewingContainer = () => {
  return (
    <div>
      <h1>Hamster Companion</h1>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Register} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default ViewingContainer;
