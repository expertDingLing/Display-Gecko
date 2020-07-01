import React from "react";
import { Box } from "@material-ui/core";

import BrandColors from "./BrandColors";
import BrandFonts from "./BrandFonts";
import Resolution from "./Resolution";

function Personalization() {
  return (
    <Box>
      <BrandColors />
      <Box mt={2} />
      <BrandFonts />
      <Box mt={2} />
      <Resolution />
    </Box>
  );
}

export default Personalization;
