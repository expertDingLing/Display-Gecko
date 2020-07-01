import _slicedToArray from "/home/home/temp/dg-tool/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import Dock from "react-dock";
import { Box, Typography, IconButton, Link } from "@material-ui/core";
import { Clear as ClearIcon } from "@material-ui/icons";
import { helpLink as helpLinkModule } from "@displaygecko/dg-modules";
var duration = 200;
var dur = duration / 1000;
var transitions = ["left", "top", "width", "height"].map(function (p) {
  return "".concat(p, " ").concat(dur, "s cubic-bezier(0, 1.5, 0.5, 1)");
}).join(",");

var mapState = function mapState(state) {
  return {
    currentPageIndex: helpLinkModule.currentPageIndexSelector(state),
    helpLinks: helpLinkModule.helpLinksSelector(state)
  };
};

function HelpDock(_ref) {
  var open = _ref.open,
      close = _ref.close,
      currentPageIndex = _ref.currentPageIndex,
      helpLinks = _ref.helpLinks,
      onRequestClose = _ref.onRequestClose;

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      helpLink = _useState2[0],
      setHelpLink = _useState2[1];

  useEffect(function () {
    setHelpLink(helpLinks.find(function (item) {
      return item.pageIndex === currentPageIndex;
    }));
  }, [currentPageIndex, helpLinks]);
  return React.createElement(Dock, {
    position: "right",
    isVisible: open,
    dimStyle: {
      background: "rgba(0, 0, 100, 0.2)"
    },
    dockStyle: {
      transition: transitions
    },
    dockHiddenStyle: {
      transition: [transitions, "opacity 0.01s linear ".concat(dur, "s")].join(",")
    },
    onVisibleChange: onRequestClose
  }, helpLink && React.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    p: 1
  }, React.createElement(Box, {
    pt: 6,
    display: "flex",
    justifyContent: "center"
  }, React.createElement(Typography, {
    variant: "h6"
  }, helpLink.articleTitle)), React.createElement(Box, null, React.createElement(Typography, {
    variant: "h6",
    dangerouslySetInnerHTML: {
      __html: helpLink.articleDescription
    }
  })), React.createElement(Box, null, React.createElement(Link, {
    href: helpLink.articleUrl,
    target: "_blank",
    rel: "noopener"
  }, "Learn More")), React.createElement(Box, {
    position: "absolute",
    right: "10px",
    top: "10px"
  }, React.createElement(IconButton, {
    onClick: close
  }, React.createElement(ClearIcon, null)))));
}

export default connect(mapState)(HelpDock);