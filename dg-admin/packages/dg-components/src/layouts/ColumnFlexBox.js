import React from "react";
import { Box } from "@material-ui/core";

function ColumnFlexBox({ children, ...props }) {
  return (
    <Box flexGrow={1} display="flex" flexDirection="column" {...props}>
      {children}
    </Box>
  );
}
export default ColumnFlexBox;
