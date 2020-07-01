import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Slide, Box } from "@material-ui/core";
var Transition = React.forwardRef(function Transition(props, ref) {
  return React.createElement(Slide, Object.assign({
    direction: "up",
    ref: ref
  }, props));
});

var ConfirmDialog = function ConfirmDialog(_ref) {
  var open = _ref.open,
      options = _ref.options,
      onRequestClose = _ref.onRequestClose;
  return React.createElement(Dialog, {
    open: open,
    TransitionComponent: Transition,
    keepMounted: true,
    disableBackdropClick: true,
    disableEscapeKeyDown: true,
    onClose: onRequestClose
  }, React.createElement(DialogTitle, null, options.title || "Confirm"), React.createElement(DialogContent, null, React.createElement(Box, null, options.contentText || "Are you sure?")), React.createElement(DialogActions, null, React.createElement(Button, {
    variant: "text",
    color: "primary",
    onClick: options.yesHandler
  }, "Yes"), React.createElement(Button, {
    color: "primary",
    onClick: options.noHandler
  }, "No")));
};

export default ConfirmDialog;