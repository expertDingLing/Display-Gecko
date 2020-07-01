import React, { useEffect, useState, useCallback } from "react";
import { Snackbar, makeStyles } from "@material-ui/core";
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon
} from "@material-ui/icons";
import { green } from "@material-ui/core/colors";

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon
};

const useStyles = makeStyles(theme => ({
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
}));

function APIResponseNotification({ response }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("response", response);
    setOpen(Boolean(response));
  }, [response]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const variant = (response || {}).status || "error";
  const Icon = variantIcon[variant];

  return variant ? (
    <Snackbar
      className={classes[variant]}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      onClose={handleClose}
      autoHideDuration={3000}
      message={
        <span id="client-snackbar" className={classes.message}>
          {Icon && <Icon className={classes.iconVariant} />}
          {response && response.message}
        </span>
      }
    />
  ) : null;
}

export default APIResponseNotification;
