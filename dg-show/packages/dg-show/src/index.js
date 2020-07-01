import React from "react";
import ReactDOM from "react-dom";
import Amplify from "aws-amplify";
import { Provider } from "react-redux";
import Auth from "@aws-amplify/auth";
import AWS from "aws-sdk";
import { PersistGate } from "redux-persist/integration/react";

import "modern-normalize/modern-normalize.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./index.css";
import "./styles/getContentTools.css";

import { createStore } from "@displaygecko/dg-modules";
import config from "./config";
import * as serviceWorker from "./serviceWorker";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  API: {
    endpoints: [
      {
        name: config.apiGateway.name,
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
});

AWS.config.correctClockSkew = true;

// =========================================
// Store Instantiation
// =========================================

// Pre-feed the data to the store for offline usage.
const initialState = {};
const { store, persistor } = createStore(initialState);

// =========================================
// Render
// =========================================
const composeApp = (App) => {
  async function asyncFunc() {
    window.DISPLAY_GECKO_SESSION_ON_LOAD = await Auth.currentSession();
  }

  asyncFunc();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

const renderApp = () => {
  const App = require("./App").default;
  ReactDOM.render(composeApp(App), document.getElementById("root"));
};

renderApp();

if (module.hot) {
  module.hot.accept("./App", renderApp);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
