import _objectSpread from "/home/home/temp/dg-tool/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2";
import React from "react";
import Box from "@material-ui/core/Box";
import useStyles from "./region.styles";

function computeRegionSize(size) {
  var width = parseInt(size.width.replace("%", ""));
  var height = parseInt(size.height.replace("%", ""));
  return {
    width: Math.trunc(1920 * width / 100),
    height: Math.trunc(1080 * height / 100)
  };
}

function Region(_ref) {
  var index = _ref.index,
      region = _ref.region,
      readOnly = _ref.readOnly;
  var classes = useStyles({});
  var computedSize = computeRegionSize(region.size);
  var regionBackgroundColors = [{
    backgroundColor: "rgba(242, 116, 0.02, 0.2)"
  }, {
    backgroundColor: "rgba(33, 217, 0.016, 0.2)"
  }, {
    backgroundColor: "rgba(71, 149, 0.016, 0.2)"
  }, {
    backgroundColor: "rgba(17, 115, 0.008, 0.2)"
  }];
  return React.createElement("div", {
    style: _objectSpread({
      position: "absolute"
    }, region.size, {}, region.styles, {}, regionBackgroundColors[index])
  }, React.createElement("div", {
    "data-tut": "reactour_screen_editing_area",
    "data-editable": true,
    "data-name": region.id,
    dangerouslySetInnerHTML: {
      __html: region.html
    }
  }), !readOnly && React.createElement(Box, {
    className: classes.regionTag,
    "data-tut": "reactour_screen_pixel_dimension"
  }, "".concat(computedSize.width, "x").concat(computedSize.height)));
}

export default Region;