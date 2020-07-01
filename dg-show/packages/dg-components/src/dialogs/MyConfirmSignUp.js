import React from "react";
import { ConfirmSignUp } from "aws-amplify-react";
import { MyAmplifyTheme } from './MyAmplifyTheme';
import { JS, I18n } from '@aws-amplify/core';
import * as AmplifyUI from '@aws-amplify/ui';
import {
	beforeAfter,
	FormSection,
	SectionHeader,
	SectionBody,
	SectionFooter,
	Button,
	Link
} from 'aws-amplify-react';

const confirmSignUp = {
	section: 'confirm-sign-up-section',
	headerSection: 'confirm-sign-up-header-section',
	bodySection: 'confirm-sign-up-body-section',
	usernameInput: 'confirm-sign-up-username-input',
	confirmationCodeInput: 'confirm-sign-up-confirmation-code-input',
	resendCodeLink: 'confirm-sign-up-resend-code-link',
	confirmButton: 'confirm-sign-up-confirm-button',
	backToSignInLink: 'confirm-sign-up-back-to-sign-in-link',
};

const propStyle = (props, themeStyle) => {
	const { id, style } = props;
	const styl = Object.assign({}, style, themeStyle);
	if (!id) {
		return styl;
	}

	const selector = '#' + id;
	Object.assign(styl, styl[selector]);
	return styl;
};

const InputLabel = props => {
	const theme = props.theme || {};
	const style = propStyle(props, theme.inputLabel);
	return beforeAfter(
		<div className={AmplifyUI.inputLabel} style={style}>
			{props.children}
		</div>
	);
};

const Input = props => {
	const theme = props.theme || {};
	const style = propStyle(props, theme.input);
	const p = JS.objectLessAttributes(props, 'theme');
	return <input {...p} className={AmplifyUI.input} style={style} />;
};

const SectionFooterPrimaryContent = props => {
	const theme = props.theme || {};
	const style = propStyle(props, theme.sectionFooterPrimaryContent);
	return beforeAfter(
		<span className={AmplifyUI.sectionFooterPrimaryContent} style={style}>
			{props.children}
		</span>
	);
};

const SectionFooterSecondaryContent = props => {
	const theme = props.theme || {};
	const style = propStyle(props, theme.sectionFooterSecondaryContent);
	return beforeAfter(
		<span className={AmplifyUI.sectionFooterSecondaryContent} style={style}>
			{props.children}
		</span>
	);
};

const FormField = props => {
	const theme = props.theme || {};
	const style = propStyle(props, theme.formField);
	const p = JS.objectLessAttributes(props, 'theme');
	return beforeAfter(
		<div {...p} className={AmplifyUI.formField} style={style}>
			{props.children}
		</div>
	);
};

const Hint = props => {
	const theme = props.theme || {};
	const style = propStyle(props, theme.hint);
	return beforeAfter(
		<div className={AmplifyUI.hint} style={style}>
			{props.children}
		</div>
	);
};

class MyConfirmSignUp extends ConfirmSignUp {
    constructor(props) {
      super(props);
      this._validAuthStates = ["confirmSignUp"];
    }
  
    showComponent(theme) {
          const { hide } = this.props;
          const username = this.usernameFromAuthData();
  
          if (hide && hide.includes(MyConfirmSignUp)) {
              return null;
          }
  
          return (
              <FormSection theme={MyAmplifyTheme} data-test={confirmSignUp.section}>
                  <SectionHeader
                      theme={MyAmplifyTheme}
                      data-test={confirmSignUp.headerSection}
                  >
                      {I18n.get('Confirm Sign Up')}
                  </SectionHeader>
                  <SectionBody theme={MyAmplifyTheme} data-test={confirmSignUp.bodySection}>
                      <FormField theme={MyAmplifyTheme}>
                          <InputLabel theme={MyAmplifyTheme}>
                              {I18n.get(this.getUsernameLabel())} *
                          </InputLabel>
                          <Input
                              placeholder={I18n.get('Username')}
                              theme={MyAmplifyTheme}
                              key="username"
                              name="username"
                              onChange={this.handleInputChange}
                              disabled={username}
                              value={username ? username : ''}
                              data-test={confirmSignUp.usernameInput}
                          />
                      </FormField>
  
                      <FormField theme={MyAmplifyTheme}>
                          <div style={{display:'flex'}}>
                            <InputLabel theme={MyAmplifyTheme}>
                                {I18n.get('Confirmation Code')} *
                            </InputLabel>

                            <Hint theme={MyAmplifyTheme} style={{position:'absolute', right:'0px', marginRight:'40px'}}>
                                {I18n.get('Check your email for a confirmation code')}
                            </Hint>
                          </div>
                          <Input
                              autoFocus
                              placeholder={I18n.get('Enter your code')}
                              theme={MyAmplifyTheme}
                              key="code"
                              name="code"
                              autoComplete="off"
                              onChange={this.handleInputChange}
                              data-test={confirmSignUp.confirmationCodeInput}
                          />
                          
                          <Hint theme={MyAmplifyTheme}>
                              {I18n.get('Lost your code? ')}
                              <Link
                                  theme={MyAmplifyTheme}
                                  onClick={this.resend}
                                  data-test={confirmSignUp.resendCodeLink}
                              >
                                  {I18n.get('Resend Code')}
                              </Link>
                          </Hint>
                      </FormField>
                  </SectionBody>
                  <SectionFooter theme={MyAmplifyTheme}>
                      <SectionFooterPrimaryContent theme={MyAmplifyTheme}>
                          <Button
                              theme={MyAmplifyTheme}
                              onClick={this.confirm}
                              data-test={confirmSignUp.confirmButton}
                          >
                              {I18n.get('Confirm')}
                          </Button>
                      </SectionFooterPrimaryContent>
                      <SectionFooterSecondaryContent theme={MyAmplifyTheme} 
                            style={{position: 'absolute', left: '0px', marginLeft: '40px', marginTop: '15px'}}>
                          <Link
                              theme={MyAmplifyTheme}
                              onClick={() => this.changeState('signIn')}
                              data-test={confirmSignUp.backToSignInLink}
                          >
                              {I18n.get('Back to Sign In')}
                          </Link>
                      </SectionFooterSecondaryContent>
                  </SectionFooter>
              </FormSection>
          );
    }
  }

  export default MyConfirmSignUp;