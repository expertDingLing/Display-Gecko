import React, { useCallback, useEffect } from "react";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import sizeMe from "react-sizeme";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Tooltip,
  Typography
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import {
  Settings as SettingsIcon,
  PowerSettingsNew as PowerSettingsNewIcon,
  Home as HomeIcon,
  ViewQuilt as ViewQuiteIcon
} from "@material-ui/icons";
import Auth from "@aws-amplify/auth";

function Header({ match, location, size, onChangeHeight }) {
  useEffect(() => {
    onChangeHeight(size.height);
  }, [onChangeHeight, size.height]);

  const handleSignOut = useCallback(() => {
    Auth.signOut();
  }, []);

  const isConfigPage = match.url === "/config";
  let showHomeIcon = true;
  let showScreenIcon = false;
  let showSettingsIcon = true;

  if (isConfigPage && location.state && location.state.previousPath !== "/") {
    showScreenIcon = true;
  }

  if (isConfigPage) {
    showSettingsIcon = false;
  }

  if (match.url === "/") {
    showHomeIcon = false;
  }

  return (
    <AppBar position="relative">
      <Toolbar variant="dense">
        <NavLink to="/">
          <Typography>Display Gecko</Typography>
        </NavLink>
        <Box flexGrow={1} />
        {showHomeIcon && (
          <NavLink to="/">
            <Tooltip title="Dashboard">
              <IconButton aria-label="dashboard" color="inherit">
                <HomeIcon data-tut="reactour_dashboard_button"/>
              </IconButton>
            </Tooltip>
          </NavLink>
        )}
        {showScreenIcon && (
          <NavLink to={location.state.previousPath}>
            <Tooltip title="Screen">
              <IconButton aria-label="screen" color="inherit">
                <ViewQuiteIcon data-tut="reactour_screen_button" />
              </IconButton>
            </Tooltip>
          </NavLink>
        )}
        {showSettingsIcon && (
          <NavLink
            to={{
              pathname: "/config",
              state: { previousPath: match.url }
            }}
          >
            <Tooltip title="Settings">
              <IconButton aria-label="settings" color="inherit">
                <SettingsIcon  data-tut="reactour_configuration_button"/>
              </IconButton>
            </Tooltip>
          </NavLink>
        )}
        <Tooltip title="Sign Out">
          <IconButton
            aria-label="sign out"
            color="inherit"
            onClick={handleSignOut}
          >
            <PowerSettingsNewIcon  data-tut="reactour_logout_button"/>
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

const enhance = compose(withRouter, sizeMe({ monitorHeight: true }));

export default enhance(Header);
