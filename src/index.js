import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
