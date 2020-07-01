import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Dashboard, Screen, Configurations } from "./pages";
import { withMainLayout, withPrimaryPageLayout } from "./layouts";

function Routes() {
  return (
    <Switch>
      <Route
        path="/"
        exact
        component={withMainLayout(withPrimaryPageLayout(Dashboard))}
      />
      <Route
        path="/screens/:screenId"
        exact
        component={withMainLayout(Screen)}
      />
      <Route
        path="/config"
        exact
        component={withMainLayout(withPrimaryPageLayout(Configurations))}
      />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
}

export default Routes;
