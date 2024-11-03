// import { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './lib/i18n.js';
import { Provider } from 'react-redux';
import store from './redux/store.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
