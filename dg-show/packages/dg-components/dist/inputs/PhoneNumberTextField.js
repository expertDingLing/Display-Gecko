import _objectWithoutProperties from "/home/home/temp/dg-tool/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from "react";
import NumberFormat from "react-number-format";
import { TextField } from "@material-ui/core";

function NumberFormatCustom(props) {
  var inputRef = props.inputRef,
      onChange = props.onChange,
      _onBlur = props.onBlur,
      name = props.name,
      other = _objectWithoutProperties(props, ["inputRef", "onChange", "onBlur", "name"]);

  return React.createElement(NumberFormat, Object.assign({}, other, {
    getInputRef: inputRef,
    onValueChange: function onValueChange(values) {
      onChange({
        target: {
          name: name,
          value: values.value
        }
      });
    },
    onBlur: function onBlur(e) {
      _onBlur({
        target: {
          name: name
        }
      });
    },
    format: "+1 (###) ###-####",
    mask: "_"
  }));
}

function PhoneNumberTextField(props) {
  return React.createElement(TextField, Object.assign({}, props, {
    InputProps: {
      inputComponent: NumberFormatCustom
    }
  }));
}

export default PhoneNumberTextField;