import React from 'react';
import { Route, Redirect } from 'react-router';
import Register from '../components/Register';
import Login from '../components/Login';

const ViewingContainer = () => {
  return (
    <div>
      <h1>Hamster Companion</h1>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
    </div>
  );
};

export default ViewingContainer;
