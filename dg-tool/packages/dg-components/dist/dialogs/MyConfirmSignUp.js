import _classCallCheck from "/home/home/temp/dg-tool/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/home/temp/dg-tool/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/home/temp/dg-tool/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/home/temp/dg-tool/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/home/temp/dg-tool/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits";
import React from "react";
import { ConfirmSignUp } from "aws-amplify-react";
import { MyAmplifyTheme } from './MyAmplifyTheme';
import { JS, I18n } from '@aws-amplify/core';
import * as AmplifyUI from '@aws-amplify/ui';
import { beforeAfter, FormSection, SectionHeader, SectionBody, SectionFooter, Button, Link } from 'aws-amplify-react';
var confirmSignUp = {
  section: 'confirm-sign-up-section',
  headerSection: 'confirm-sign-up-header-section',
  bodySection: 'confirm-sign-up-body-section',
  usernameInput: 'confirm-sign-up-username-input',
  confirmationCodeInput: 'confirm-sign-up-confirmation-code-input',
  resendCodeLink: 'confirm-sign-up-resend-code-link',
  confirmButton: 'confirm-sign-up-confirm-button',
  backToSignInLink: 'confirm-sign-up-back-to-sign-in-link'
};

var propStyle = function propStyle(props, themeStyle) {
  var id = props.id,
      style = props.style;
  var styl = Object.assign({}, style, themeStyle);

  if (!id) {
    return styl;
  }

  var selector = '#' + id;
  Object.assign(styl, styl[selector]);
  return styl;
};

var InputLabel = function InputLabel(props) {
  var theme = props.theme || {};
  var style = propStyle(props, theme.inputLabel);
  return beforeAfter(React.createElement("div", {
    className: AmplifyUI.inputLabel,
    style: style
  }, props.children));
};

var Input = function Input(props) {
  var theme = props.theme || {};
  var style = propStyle(props, theme.input);
  var p = JS.objectLessAttributes(props, 'theme');
  return React.createElement("input", Object.assign({}, p, {
    className: AmplifyUI.input,
    style: style
  }));
};

var SectionFooterPrimaryContent = function SectionFooterPrimaryContent(props) {
  var theme = props.theme || {};
  var style = propStyle(props, theme.sectionFooterPrimaryContent);
  return beforeAfter(React.createElement("span", {
    className: AmplifyUI.sectionFooterPrimaryContent,
    style: style
  }, props.children));
};

var SectionFooterSecondaryContent = function SectionFooterSecondaryContent(props) {
  var theme = props.theme || {};
  var style = propStyle(props, theme.sectionFooterSecondaryContent);
  return beforeAfter(React.createElement("span", {
    className: AmplifyUI.sectionFooterSecondaryContent,
    style: style
  }, props.children));
};

var FormField = function FormField(props) {
  var theme = props.theme || {};
  var style = propStyle(props, theme.formField);
  var p = JS.objectLessAttributes(props, 'theme');
  return beforeAfter(React.createElement("div", Object.assign({}, p, {
    className: AmplifyUI.formField,
    style: style
  }), props.children));
};

var Hint = function Hint(props) {
  var theme = props.theme || {};
  var style = propStyle(props, theme.hint);
  return beforeAfter(React.createElement("div", {
    className: AmplifyUI.hint,
    style: style
  }, props.children));
};

var MyConfirmSignUp =
/*#__PURE__*/
function (_ConfirmSignUp) {
  _inherits(MyConfirmSignUp, _ConfirmSignUp);

  function MyConfirmSignUp(props) {
    var _this;

    _classCallCheck(this, MyConfirmSignUp);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MyConfirmSignUp).call(this, props));
    _this._validAuthStates = ["confirmSignUp"];
    return _this;
  }

  _createClass(MyConfirmSignUp, [{
    key: "showComponent",
    value: function showComponent(theme) {
      var _this2 = this;

      var hide = this.props.hide;
      var username = this.usernameFromAuthData();

      if (hide && hide.includes(MyConfirmSignUp)) {
        return null;
      }

      return React.createElement(FormSection, {
        theme: MyAmplifyTheme,
        "data-test": confirmSignUp.section
      }, React.createElement(SectionHeader, {
        theme: MyAmplifyTheme,
        "data-test": confirmSignUp.headerSection
      }, I18n.get('Confirm Sign Up')), React.createElement(SectionBody, {
        theme: MyAmplifyTheme,
        "data-test": confirmSignUp.bodySection
      }, React.createElement(FormField, {
        theme: MyAmplifyTheme
      }, React.createElement(InputLabel, {
        theme: MyAmplifyTheme
      }, I18n.get(this.getUsernameLabel()), " *"), React.createElement(Input, {
        placeholder: I18n.get('Username'),
        theme: MyAmplifyTheme,
        key: "username",
        name: "username",
        onChange: this.handleInputChange,
        disabled: username,
        value: username ? username : '',
        "data-test": confirmSignUp.usernameInput
      })), React.createElement(FormField, {
        theme: MyAmplifyTheme
      }, React.createElement("div", {
        style: {
          display: 'flex'
        }
      }, React.createElement(InputLabel, {
        theme: MyAmplifyTheme
      }, I18n.get('Confirmation Code'), " *"), React.createElement(Hint, {
        theme: MyAmplifyTheme,
        style: {
          position: 'absolute',
          right: '0px',
          marginRight: '40px'
        }
      }, I18n.get('Check your email for a confirmation code'))), React.createElement(Input, {
        autoFocus: true,
        placeholder: I18n.get('Enter your code'),
        theme: MyAmplifyTheme,
        key: "code",
        name: "code",
        autoComplete: "off",
        onChange: this.handleInputChange,
        "data-test": confirmSignUp.confirmationCodeInput
      }), React.createElement(Hint, {
        theme: MyAmplifyTheme
      }, I18n.get('Lost your code? '), React.createElement(Link, {
        theme: MyAmplifyTheme,
        onClick: this.resend,
        "data-test": confirmSignUp.resendCodeLink
      }, I18n.get('Resend Code'))))), React.createElement(SectionFooter, {
        theme: MyAmplifyTheme
      }, React.createElement(SectionFooterPrimaryContent, {
        theme: MyAmplifyTheme
      }, React.createElement(Button, {
        theme: MyAmplifyTheme,
        onClick: this.confirm,
        "data-test": confirmSignUp.confirmButton
      }, I18n.get('Confirm'))), React.createElement(SectionFooterSecondaryContent, {
        theme: MyAmplifyTheme,
        style: {
          position: 'absolute',
          left: '0px',
          marginLeft: '40px',
          marginTop: '15px'
        }
      }, React.createElement(Link, {
        theme: MyAmplifyTheme,
        onClick: function onClick() {
          return _this2.changeState('signIn');
        },
        "data-test": confirmSignUp.backToSignInLink
      }, I18n.get('Back to Sign In')))));
    }
  }]);

  return MyConfirmSignUp;
}(ConfirmSignUp);

export default MyConfirmSignUp;