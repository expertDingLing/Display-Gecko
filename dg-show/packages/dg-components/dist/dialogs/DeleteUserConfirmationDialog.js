import _defineProperty from "/home/home/temp/dg-tool/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "/home/home/temp/dg-tool/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2";
import _slicedToArray from "/home/home/temp/dg-tool/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useCallback } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Slide, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, TextField } from "@material-ui/core";
var Transition = React.forwardRef(function Transition(props, ref) {
  return React.createElement(Slide, Object.assign({
    direction: "up",
    ref: ref
  }, props));
});

var DeleteUserConfirmationDialog = function DeleteUserConfirmationDialog(_ref) {
  var open = _ref.open,
      onDelete = _ref.onDelete,
      onRequestClose = _ref.onRequestClose;

  var _useState = useState({
    "not-enough-control": false,
    "too-hard": false,
    "too-expensive": false,
    "out-of-business": false,
    "different-product": false,
    other: false,
    otherReason: ""
  }),
      _useState2 = _slicedToArray(_useState, 2),
      leavingReasons = _useState2[0],
      setLeavingReasons = _useState2[1];

  var handleChangeReason = useCallback(function (e) {
    var name = e.target.name;
    setLeavingReasons(_objectSpread({}, leavingReasons, _defineProperty({}, name, name === "otherReason" ? e.target.value : e.target.checked)));
  }, [leavingReasons]);
  var handleDeleteAccount = useCallback(function () {
    onDelete(leavingReasons);
  }, [leavingReasons, onDelete]);
  return React.createElement(Dialog, {
    open: open,
    TransitionComponent: Transition,
    keepMounted: true,
    disableBackdropClick: true,
    disableEscapeKeyDown: true,
    onClose: onRequestClose
  }, React.createElement(DialogTitle, null, "Please Confirm"), React.createElement(DialogContent, null, React.createElement(FormControl, {
    component: "fieldset"
  }, React.createElement(FormLabel, {
    component: "legend"
  }, "Please tell us why you are leaving"), React.createElement(FormGroup, null, React.createElement(FormControlLabel, {
    control: React.createElement(Checkbox, {
      name: "not-enough-control",
      checked: leavingReasons["not-enough-control"],
      onChange: handleChangeReason,
      value: "not-enough-control"
    }),
    label: "Does not provide enough design control"
  }), React.createElement(FormControlLabel, {
    control: React.createElement(Checkbox, {
      name: "too-hard",
      checked: leavingReasons["too-hard"],
      onChange: handleChangeReason,
      value: "too-hard"
    }),
    label: "Too hard to use"
  }), React.createElement(FormControlLabel, {
    control: React.createElement(Checkbox, {
      name: "too-expensive",
      checked: leavingReasons["too-expensive"],
      onChange: handleChangeReason,
      value: "too-expensive"
    }),
    label: "Too expensive"
  }), React.createElement(FormControlLabel, {
    control: React.createElement(Checkbox, {
      name: "out-of-business",
      checked: leavingReasons["out-of-business"],
      onChange: handleChangeReason,
      value: "out-of-business"
    }),
    label: "Out of business"
  }), React.createElement(FormControlLabel, {
    control: React.createElement(Checkbox, {
      name: "different-product",
      checked: leavingReasons["different-product"],
      onChange: handleChangeReason,
      value: "different-product"
    }),
    label: "Using a different product"
  }), React.createElement(FormControlLabel, {
    control: React.createElement(Checkbox, {
      name: "other",
      checked: leavingReasons["other"],
      onChange: handleChangeReason,
      value: "other"
    }),
    label: "Other"
  }), leavingReasons.other && React.createElement(TextField, {
    name: "otherReason",
    value: leavingReasons.otherReason,
    onChange: handleChangeReason,
    multiline: true,
    rows: 4
  })))), React.createElement(DialogActions, null, React.createElement(Button, {
    variant: "text",
    color: "secondary",
    onClick: handleDeleteAccount
  }, "Delete Account"), React.createElement(Button, {
    variant: "contained",
    color: "primary",
    onClick: onRequestClose
  }, "Cancel")));
};

export default DeleteUserConfirmationDialog;