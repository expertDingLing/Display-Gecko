import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@material-ui/styles";
import Amplify from "aws-amplify";

// Styles
import "modern-normalize/modern-normalize.css";
import "./index.css";
import "./styles/getContentTools.css";
import "rc-color-picker/assets/index.css";

import { createStore } from "@displaygecko/dg-modules";
import { theme } from "@displaygecko/dg-components";
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
        // As we are using a custom authorizer - cognito user pool authorizer, we have to use the JWT token provided by the authentication API to authenticate against API Gateway directly
        // custom_header: async () => {
        //   return {
        //     Authorization: `Bearer ${(await Auth.currentSession())
        //       .getIdToken()
        //       .getJwtToken()}`
        //   };
        // }
      },
    ],
  },
});

// =========================================
// Store Instantiation
// =========================================
const initialState = {};
const { store, persistor } = createStore(initialState);

// =========================================
// Render
// =========================================
const composeApp = (App) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate persistor = {persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ThemeProvider>
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
