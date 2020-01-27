import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import PromisePolyfill from 'promise-polyfill';
import './index.css';

if (!window.Promise) {
  window.Promise = PromisePolyfill;
}

ReactDOM.render(<App />, document.getElementById('root'));
