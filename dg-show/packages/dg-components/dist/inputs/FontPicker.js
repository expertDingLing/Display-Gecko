import _objectWithoutProperties from "/home/home/temp/dg-tool/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from "react";
import { Select, FormControl, InputLabel, MenuItem, Box } from "@material-ui/core";

function FontPicker(_ref) {
  var fontsList = _ref.fontsList,
      label = _ref.label,
      value = _ref.value,
      onChange = _ref.onChange,
      props = _objectWithoutProperties(_ref, ["fontsList", "label", "value", "onChange"]);

  return React.createElement(Box, {
    mt: 1,
    mb: 0.5
  }, React.createElement(FormControl, null, React.createElement(InputLabel, null, label), React.createElement(Select, Object.assign({
    value: value,
    onChange: onChange
  }, props), fontsList.map(function (font, index) {
    return React.createElement(MenuItem, {
      key: index,
      value: font.face,
      style: font.style
    }, font.name);
  }))));
}

export default FontPicker;