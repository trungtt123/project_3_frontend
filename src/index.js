import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "antd/dist/antd.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";

// import configureStore from "./store";
import 'react-notifications/lib/notifications.css';
import { createStore } from 'redux'
import reducer from './reducers/index'
import { CookiesProvider } from 'react-cookie';

const startApp = () => {
  const store = createStore(reducer);
  const root = ReactDOM.createRoot(
    document.getElementById('root')
  );
  root.render(
    <CookiesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>
  );
};


if (window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
