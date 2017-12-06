import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import Root from './containers/Root';
import rootReducer from './reducers/index';
import './css/main.css';

const store = createStore(rootReducer);

render(
  <Root store={store} />,
  document.getElementById('root')
);
