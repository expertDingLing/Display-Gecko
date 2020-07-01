import React from "react";
import NumberFormat from "react-number-format";
import { TextField } from "@material-ui/core";

function NumberFormatCustom(props) {
  const { inputRef, onChange, onBlur, name, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name,
            value: values.value
          }
        });
      }}
      onBlur={e => {
        onBlur({
          target: {
            name
          }
        });
      }}
      format="+1 (###) ###-####"
      mask="_"
    />
  );
}

function PhoneNumberTextField(props) {
  return (
    <TextField
      {...props}
      InputProps={{
        inputComponent: NumberFormatCustom
      }}
    />
  );
}

export default PhoneNumberTextField;
