import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import Root from './containers/Root';
import reducers from './reducers/index';

const store = createStore(reducers);

render(
  <Root store={store} />,
  document.getElementById('root')
);
