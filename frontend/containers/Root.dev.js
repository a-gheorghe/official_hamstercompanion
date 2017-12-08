import PropTypes from 'prop-types';
import React from 'react';
import { Provider, connect } from 'react-redux';
import { Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ViewingContainer from './ViewingContainer.js';
import UserContainer from './UserContainer.js';

function Root({ store, loggedIn }) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        { loggedIn ?
          <div><UserContainer /> <Redirect to="/experiments" /></div> :
          <div><ViewingContainer /> <Redirect to="/register" /></div> }
      </BrowserRouter>
    </Provider>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.loggedIn
});

export default connect(mapStateToProps, null)(Root);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};
