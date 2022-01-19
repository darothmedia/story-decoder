import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/root.scss';
import Root from './components/root';
import reportWebVitals from './reportWebVitals';
import configureStore from './store/store'

var preloadedState = {}
const store = configureStore(preloadedState)

ReactDOM.render(
  <React.StrictMode>
    <Root store={store} />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

