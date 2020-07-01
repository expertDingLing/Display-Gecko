import React from "react";
import { Box } from "@material-ui/core";

function NarrowLayout({ children }) {
  return (
    <Box width="100%" maxWidth={1024} mx="auto" mt={3}>
      {children}
    </Box>
  );
}

export default NarrowLayout;
