import { createAction, handleActions } from "redux-actions";
import { createSelector } from "reselect";
import { GET_USER, UPDATE_USER, DELETE_ACCOUNT } from "./actionTypes";

import { API } from "aws-amplify";
import config from "../config";
import { fulfilled } from "./actionUtils";

// ==================================
// Selectors
// ==================================
export const userSelector = createSelector(
  state => state.user,
  user => user.data
);

// ==================================
// Actions
// ==================================
export const getUser = createAction(GET_USER, () => {
  return API.get(config.apiGateway.name, "/company/users/me");
});

export const updateUser = createAction(UPDATE_USER, user => {
  return API.put(config.apiGateway.name, "/company/users/me", { body: user });
});

export const deleteAccount = createAction(DELETE_ACCOUNT, reasons => {
  return API.del(config.apiGateway.name, "/company/users/me", {
    body: reasons
  });
});

// ==================================
// Action Handlers
// ==================================
const ACTION_HANDLERS = {
  [fulfilled(getUser)]: (state, action) => ({
    ...state,
    data: action.payload
  }),
  [fulfilled(updateUser)]: (state, action) => ({
    ...state,
    data: action.payload
  })
};

// ==================================
// Reducer
// ==================================
const initialState = {
  data: null
};

export default handleActions(ACTION_HANDLERS, initialState);
