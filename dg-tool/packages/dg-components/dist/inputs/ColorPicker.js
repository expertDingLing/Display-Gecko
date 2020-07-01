import React from "react";
import { Box, InputLabel } from "@material-ui/core";
import RCColorPicker from "rc-color-picker";

function ColorPicker(_ref) {
  var label = _ref.label,
      _ref$labelWidth = _ref.labelWidth,
      labelWidth = _ref$labelWidth === void 0 ? "auto" : _ref$labelWidth,
      value = _ref.value,
      onChange = _ref.onChange,
      onBlur = _ref.onBlur;
  return React.createElement(Box, {
    display: "flex",
    alignItems: "center",
    mt: 1,
    mb: 0.5
  }, React.createElement(Box, {
    width: labelWidth
  }, React.createElement(InputLabel, null, label)), React.createElement(Box, {
    ml: 1
  }, React.createElement(RCColorPicker, {
    animation: "slide-up",
    color: value,
    onChange: onChange,
    onClose: onBlur,
    style: {
      zIndex: 1200
    }
  })));
}

export default ColorPicker;