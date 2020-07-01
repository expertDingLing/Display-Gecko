import React from "react";
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Box
} from "@material-ui/core";

function FontPicker({ fontsList, label, value, onChange, ...props }) {
  return (
    <Box mt={1} mb={0.5}>
      <FormControl>
        <InputLabel>{label}</InputLabel>
        <Select value={value} onChange={onChange} {...props}>
          {fontsList.map((font, index) => (
            <MenuItem key={index} value={font.face} style={font.style}>
              {font.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default FontPicker;
