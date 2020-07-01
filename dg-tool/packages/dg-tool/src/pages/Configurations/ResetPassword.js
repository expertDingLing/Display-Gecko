import React, { useState, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Typography
} from "@material-ui/core";
import * as yup from "yup";
import Auth from "@aws-amplify/auth";

import { APIResponseNotification } from "@displaygecko/dg-components";

const passwordSchema = yup
  .string()
  .required("Please Enter your password")
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  );

const emptyState = {
  password: "",
  newPassword: "",
  newPasswordError: "",
  formMessage: ""
};

function ResetPassword() {
  const [state, setState] = useState(emptyState);
  const [apiResponse, setApiResponse] = useState(null);

  const handleChangePassword = useCallback(
    e => {
      const newState = {
        ...state,
        [e.target.name]: e.target.value,
        formMessage: ""
      };
      if (e.target.name === "newPassword") newState.newPasswordError = "";
      setState(newState);
    },
    [state]
  );

  const handleResetPassword = useCallback(async () => {
    if (!state.newPassword) return;

    let newState = { ...state };

    if (!state.password) {
      newState.formMessage = "Please enter your current password";
    }

    try {
      passwordSchema.validateSync(state.newPassword);
      try {
        const user = await Auth.currentAuthenticatedUser();
        await Auth.changePassword(user, state.password, state.newPassword);
        setApiResponse({
          status: "success",
          message: "Your password was changed successfully!"
        });
        newState = emptyState;
      } catch (error) {
        setApiResponse({
          status: "error",
          message: error.message
        });
        newState = emptyState;
      }
    } catch (error) {
      newState.newPasswordError = error.message;
    }

    setState(newState);
  }, [state]);

  return (
    <>
      <Card>
        <CardHeader title="Reset Password" />
        <CardContent>
          {state.formMessage && (
            <Typography color="error">{state.formMessage}</Typography>
          )}
          <TextField
            label="Current Password"
            fullWidth
            margin="dense"
            type="password"
            name="password"
            value={state.password}
            onChange={handleChangePassword}
          />
          <TextField
            label="New Password"
            fullWidth
            margin="dense"
            type="password"
            name="newPassword"
            value={state.newPassword}
            onChange={handleChangePassword}
            onBlur={handleResetPassword}
            error={Boolean(state.newPasswordError)}
            helperText={state.newPasswordError}
          />
        </CardContent>
      </Card>
      <APIResponseNotification response={apiResponse} />
    </>
  );
}

export default ResetPassword;
