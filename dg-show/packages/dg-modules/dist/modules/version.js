import { createAction, handleActions } from "redux-actions";
import { createSelector } from "reselect";
import { GET_VERSIONS } from "./actionTypes";
import { API } from "aws-amplify";
import { fulfilled } from "./actionUtils";
import config from "../config"; // ==================================
// Selectors
// ==================================

export const currentVersionsSelector = createSelector(state => state.version, version => version.current);
export const prevVersionsSelector = createSelector(state => state.version, version => version.prev); // ==================================
// Actions
// ==================================

export const getVersions = createAction(GET_VERSIONS, () => {
  return API.get(config.apiGateway.name, "/company/versions");
}); // ==================================
// Action Handlers
// ==================================

const ACTION_HANDLERS = {
  [fulfilled(getVersions)]: (state, action) => ({ ...state,
    current: action.payload,
    prev: state.current
  })
}; // ==================================
// Reducer
// ==================================

const initialState = {
  current: null,
  prev: null
};
export default handleActions(ACTION_HANDLERS, initialState);