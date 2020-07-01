import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { withAuthenticator, SignIn } from "aws-amplify-react";

import Routes from "./Routes";

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default withAuthenticator(App, false, [<SignIn />]);
