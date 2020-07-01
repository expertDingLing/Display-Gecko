import React from "react";
import { Switch, Route } from "react-router-dom";

import { Dashboard } from "./pages";
import { withMainLayout, withPrimaryPageLayout } from "./layouts";

function Routes() {
  return (
    <Switch>
      <Route
        path="/"
        exact
        component={withMainLayout(withPrimaryPageLayout(Dashboard))}
      />
    </Switch>
  );
}

export default Routes;
