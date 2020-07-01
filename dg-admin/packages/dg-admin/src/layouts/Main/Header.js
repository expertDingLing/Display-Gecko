import React, { useCallback } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Tooltip,
  Typography
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { PowerSettingsNew as PowerSettingsNewIcon } from "@material-ui/icons";
import Auth from "@aws-amplify/auth";

function Header() {
  const handleSignOut = useCallback(() => {
    Auth.signOut();
  }, []);

  return (
    <AppBar position="relative">
      <Toolbar variant="dense">
        <NavLink to="/">
          <Typography>Display Gecko</Typography>
        </NavLink>
        <Box flexGrow={1} />

        <Tooltip title="Sign Out">
          <IconButton
            aria-label="sign out"
            color="inherit"
            onClick={handleSignOut}
          >
            <PowerSettingsNewIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
