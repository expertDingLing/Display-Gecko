import React from "react";
import { Box, makeStyles } from "@material-ui/core";

import Header from "./Header";

const useStyles = makeStyles(theme => ({
  main: {
    overflowY: "auto"
  }
}));

function MainLayout({ children }) {
  const classes = useStyles();

  return (
    <>
      <Header />
      <Box
        display="flex"
        height={"calc(100vh - 48px)"}
        className={classes.main}
      >
        <Box flexGrow={1} id="pageInnerView">
          {children}
        </Box>
      </Box>
    </>
  );
}

export default MainLayout;
