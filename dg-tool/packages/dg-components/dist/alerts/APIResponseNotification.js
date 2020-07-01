import _slicedToArray from "/home/home/temp/dg-tool/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import React, { useEffect, useState, useCallback } from "react";
import { Snackbar, makeStyles } from "@material-ui/core";
import { CheckCircle as CheckCircleIcon, Error as ErrorIcon } from "@material-ui/icons";
import { green } from "@material-ui/core/colors";
var variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon
};
var useStyles = makeStyles(function (theme) {
  return {
    success: {
      "& div": {
        backgroundColor: green[600]
      }
    },
    error: {
      "& div": {
        backgroundColor: theme.palette.error.dark
      }
    },
    icon: {
      fontSize: 20
    },
    iconVariant: {
      fontSize: 20,
      opacity: 0.9,
      marginRight: theme.spacing(1)
    },
    message: {
      display: "flex",
      alignItems: "center"
    }
  };
});

function APIResponseNotification(_ref) {
  var response = _ref.response;
  var classes = useStyles();

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  useEffect(function () {
    console.log("response", response);
    setOpen(Boolean(response));
  }, [response]);
  var handleClose = useCallback(function () {
    setOpen(false);
  }, []);
  var variant = (response || {}).status || "error";
  var Icon = variantIcon[variant];
  return variant ? React.createElement(Snackbar, {
    className: classes[variant],
    anchorOrigin: {
      vertical: "top",
      horizontal: "center"
    },
    open: open,
    onClose: handleClose,
    autoHideDuration: 3000,
    message: React.createElement("span", {
      id: "client-snackbar",
      className: classes.message
    }, Icon && React.createElement(Icon, {
      className: classes.iconVariant
    }), response && response.message)
  }) : null;
}

export default APIResponseNotification;