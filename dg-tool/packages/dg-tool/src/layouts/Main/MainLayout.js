import React, { useCallback, useState } from "react";
import { Box, IconButton, useTheme, makeStyles } from "@material-ui/core";
import { Help as HelpIcon } from "@material-ui/icons";

import { HelpDock, TrialModeBanner } from "@displaygecko/dg-components";
import Header from "./Header";
import { useToggle } from "../../helpers";

const useStyles = makeStyles(theme => ({
  main: {
    overflowY: "auto"
  }
}));

function MainLayout({ children }) {
  const theme = useTheme();
  const classes = useStyles();

  const [bannerHeight, setBannerHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  const {
    on: openHelpDialog,
    setOn: showHelpDialog,
    setOff: closeHelpDialog
  } = useToggle();

  const handleOpenHelp = useCallback(() => {
    showHelpDialog();
  }, [showHelpDialog]);

  const handleCloseHelp = useCallback(() => {
    closeHelpDialog();
  }, [closeHelpDialog]);

  const handleChangeHeight = useCallback(
    elType => height => {
      if (elType === "header") setHeaderHeight(height);
      if (elType === "banner") setBannerHeight(height);
    },
    []
  );

  return (
    <>
      <TrialModeBanner onChangeHeight={handleChangeHeight("banner")} />
      <Header onChangeHeight={handleChangeHeight("header")} />
      <Box position="relative" zIndex={1}>
        <Box position="absolute" right={theme.spacing(3)}>
          <IconButton
            aria-label="help"
            color="inherit"
            onClick={handleOpenHelp}
          >
            <HelpIcon fontSize="small" data-tut="reactour_contextual_help"/>
          </IconButton>
        </Box>
      </Box>
      <Box
        display="flex"
        height={`calc(100vh - ${bannerHeight + headerHeight}px)`}
        className={classes.main}
      >
        <Box flexGrow={1} id="pageInnerView">
          {children}
        </Box>
      </Box>
      <HelpDock open={openHelpDialog} close={handleCloseHelp} onRequestClose={closeHelpDialog} />
    </>
  );
}

export default MainLayout;
