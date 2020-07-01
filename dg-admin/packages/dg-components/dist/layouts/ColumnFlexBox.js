import _objectWithoutProperties from "/home/home/temp/dg-tool/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from "react";
import { Box } from "@material-ui/core";

function ColumnFlexBox(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);

  return React.createElement(Box, Object.assign({
    flexGrow: 1,
    display: "flex",
    flexDirection: "column"
  }, props), children);
}

export default ColumnFlexBox;