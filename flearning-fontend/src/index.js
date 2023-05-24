import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import {store, persistor} from './redux/store';
import { ToastContainer } from 'react-toastify';
// import 'node_modules/react-modal-video/scss/modal-video.scss';
import { PersistGate } from "redux-persist/integration/react";

import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer position="bottom-right" />
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
);

