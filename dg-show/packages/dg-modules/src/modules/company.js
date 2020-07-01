import { createAction, handleActions } from "redux-actions";
import { createSelector } from "reselect";
import { GET_COMPANY, UPDATE_COMPANY } from "./actionTypes";

import { API } from "aws-amplify";
import { fulfilled } from "./actionUtils";
import config from "../config";

// ==================================
// Selectors
// ==================================
export const companySelector = createSelector(
  (state) => state.company,
  (company) => company.data
);

// ==================================
// Actions
// ==================================
export const getCompany = createAction(GET_COMPANY, () => (_, getState) => {
  if (window.navigator.onLine) {
    return API.get(config.apiGateway.name, "/company/me");
  } else {
    return companySelector(getState());
  }
});

export const updateCompany = createAction(UPDATE_COMPANY, (company) => {
  return API.put(config.apiGateway.name, "/company/me", {
    body: company,
  });
});

// ==================================
// Action Handlers
// ==================================
const ACTION_HANDLERS = {
  [fulfilled(getCompany)]: (state, action) => ({
    ...state,
    data: action.payload,
  }),
  [fulfilled(updateCompany)]: (state, action) => ({
    ...state,
    data: action.payload,
  }),
};

// ==================================
// Reducer
// ==================================
const initialState = {
  data: null,
};

export default handleActions(ACTION_HANDLERS, initialState);
