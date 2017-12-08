import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import ViewingContainer from './ViewingContainer.js';

export default function Root({ store }) {
  return (
    <Provider store={store}>
      <ViewingContainer />
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};
