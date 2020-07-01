import { createAction, handleActions } from "redux-actions";
import { createSelector } from "reselect";
import { GET_ALL_TEMPLATES } from "./actionTypes";
import { API } from "aws-amplify";
import { fulfilled } from "./actionUtils";
import config from "../config"; // ==================================
// Selectors
// ==================================

export const templateListSelector = createSelector(state => state.template, template => template.list); // ==================================
// Actions
// ==================================

export const getAllTemplates = createAction(GET_ALL_TEMPLATES, () => {
  return API.get(config.apiGateway.name, "/templates");
}); // ==================================
// Action Handlers
// ==================================

const ACTION_HANDLERS = {
  [fulfilled(getAllTemplates)]: (state, action) => ({ ...state,
    list: action.payload
  })
}; // ==================================
// Reducer
// ==================================

const initialState = {
  list: []
};
export default handleActions(ACTION_HANDLERS, initialState);