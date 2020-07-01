import React, { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardHeader,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box
} from "@material-ui/core";

import { PhoneNumberTextField } from "@displaygecko/dg-components";
import { user as userModule } from "@displaygecko/dg-modules";

function General({ user, updateUser }) {
  const [state, setState] = useState({
    phoneNumber: "",
    emailPref: "all"
  });

  useEffect(() => {
    if (user) {
      setState({
        phoneNumber: user.phoneNumber.substring(2),
        emailPref: user.emailPref || "all"
      });
    }
  }, [user]);

  const handleChange = useCallback(
    e => {
      const targetName = e.target.name;
      const targetValue = e.target.value;

      setState({
        ...state,
        [targetName]: targetValue
      });

      if (targetName === "emailPref") {
        updateUser({ emailPref: targetValue });
      }
    },
    [state, updateUser]
  );

  const handleBlur = useCallback(
    e => {
      if (e.target.name === "phoneNumber") {
        updateUser({ phoneNumber: `+1${state.phoneNumber}` });
      }
    },
    [state.phoneNumber, updateUser]
  );

  return (
    <Card>
      <CardHeader title="General" />
      <CardContent>
        <PhoneNumberTextField
          label="Phone Number"
          fullWidth
          margin="dense"
          value={state.phoneNumber}
          name="phoneNumber"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Box mt={1} />
        <FormControl component="fieldset" margin="dense">
          <FormLabel component="legend">Email Preferences</FormLabel>
          <RadioGroup
            aria-label="emailPref"
            name="emailPref"
            value={state.emailPref}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <FormControlLabel
              value="all"
              control={<Radio color="default" />}
              label="All email"
              labelPlacement="start"
            />
            <FormControlLabel
              value="account"
              control={<Radio color="default" />}
              label="Account Notices Only"
              labelPlacement="start"
            />
            <FormControlLabel
              value="none"
              control={<Radio color="default" />}
              label="None"
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
}

const mapState = state => ({
  user: userModule.userSelector(state)
});

const mapDispatch = {
  updateUser: userModule.updateUser
};

export default connect(mapState, mapDispatch)(General);
