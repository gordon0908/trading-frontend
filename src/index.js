import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './app/reducers';
import Routes from './app/routes';

const store = createStore(rootReducer, applyMiddleware(thunk) );
const instance = (
  <Provider store={store}>
    <Routes />
  </Provider>
);

render(instance, document.getElementById('root'));
