import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfirmSignIn, ForgotPassword, RequireNewPassword, SignIn, SignUp, VerifyContact, withAuthenticator } from "aws-amplify-react";
import { MyConfirmSignUp } from "@displaygecko/dg-components";

import Routes from "./Routes";
import {
  user,
  subscription,
  helpLink,
} from "@displaygecko/dg-modules";

const mapState = null;

const mapDispatch = {
  getUser: user.getUser,
  getSubscriptionBilling: subscription.getBillingSubscription,
  getHelpLinks: helpLink.getHelpLinks,
};

function App({ getUser, getSubscriptionBilling, getHelpLinks }) {
  useEffect(() => {
    getUser();
    getSubscriptionBilling();
    getHelpLinks();
  }, [getUser, getSubscriptionBilling, getHelpLinks]);

  return (
    <Router>
      <Routes />
    </Router>
  );
}

const connectedApp = connect(mapState, mapDispatch)(App);

export default withAuthenticator(connectedApp, {
    authenticatorComponents: [<SignIn/>,
                              <ConfirmSignIn/>,
                              <VerifyContact/>,
                              <SignUp/>,
                              <MyConfirmSignUp/>,
                              <ForgotPassword/>,
                              <RequireNewPassword />], 
    usernameAttributes: "email"
});
