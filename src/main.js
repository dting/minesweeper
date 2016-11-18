import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import 'rc-slider/assets/index.css';
import './main.scss';

import reducers from './modules/reducers';
import App from './containers/App';


const store = createStore(reducers);

render((
  <Provider store={store}>
    <App />
  </Provider>
), document.querySelector('#app'));
