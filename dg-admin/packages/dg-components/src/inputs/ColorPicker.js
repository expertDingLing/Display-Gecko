import React from "react";
import { Box, InputLabel } from "@material-ui/core";
import RCColorPicker from "rc-color-picker";

function ColorPicker({ label, labelWidth = "auto", value, onChange, onBlur }) {
  return (
    <Box display="flex" alignItems="center" mt={1} mb={0.5}>
      <Box width={labelWidth}>
        <InputLabel>{label}</InputLabel>
      </Box>
      <Box ml={1}>
        <RCColorPicker
          animation="slide-up"
          color={value}
          onChange={onChange}
          onClose={onBlur}
          style={{zIndex: 1200}}
        />
      </Box>
    </Box>
  );
}

export default ColorPicker;
