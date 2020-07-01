import { createAction, handleActions } from "redux-actions";
import { createSelector } from "reselect";
import { GET_BILLING_EMAIL_TEMPLATES, SET_BILLING_EMAIL_TEMPLATE } from "./actionTypes";
import { API } from "aws-amplify";
import { fulfilled } from "./actionUtils";
import config from "../config"; // ==================================
// Selectors
// ==================================

export const emailTemplateSelector = createSelector(state => state.emailTemplate, emailTemplate => emailTemplate);
export const billingEmailTemplatesSelector = createSelector(emailTemplateSelector, emailTemplate => emailTemplate.billing); // ==================================
// Actions
// ==================================

export const getBillingEmailTemplates = createAction(GET_BILLING_EMAIL_TEMPLATES, () => {
  return API.get(config.apiGateway.name, "/admin/billing/email-templates");
});
export const setBillingEmailTemplate = createAction(SET_BILLING_EMAIL_TEMPLATE, (templateType, templateId) => {
  return API.put(config.apiGateway.name, `/admin/billing/email-templates/${templateType}`, {
    body: {
      templateId
    }
  });
}); // ==================================
// Action Handlers
// ==================================

const ACTION_HANDLERS = {
  [fulfilled(getBillingEmailTemplates)]: (state, action) => ({ ...state,
    billing: action.payload
  }),
  [fulfilled(setBillingEmailTemplate)]: (state, action) => ({ ...state,
    billing: { ...state.billing,
      [action.payload.templateType]: action.payload.templateId
    }
  })
}; // ==================================
// Reducer
// ==================================

const initialState = {
  billing: {}
};
export default handleActions(ACTION_HANDLERS, initialState);