import { createAction, handleActions } from "redux-actions";
import { createSelector } from "reselect";
import {
  SET_CURRENT_PAGE_INDEX,
  GET_HELP_LINKS,
  CREATE_HELP_LINK,
  UPDATE_HELP_LINK,
} from "./actionTypes";

import { API } from "aws-amplify";
import { fulfilled } from "./actionUtils";
import config from "../config";

export const HELP_SUPPORT_PAGES = [
  {
    title: "Home",
    pageIndex: "home",
  },
  {
    title: "Screen",
    pageIndex: "screen",
  },
  {
    title: "Configuration",
    pageIndex: "config",
  },
];

// ==================================
// Selectors
// ==================================
export const helpLinksSelector = createSelector(
  (state) => state.helpLink,
  (helpLink) => helpLink.list
);

export const currentPageIndexSelector = createSelector(
  (state) => state.helpLink,
  (helpLink) => helpLink.currentPageIndex
);

// ==================================
// Actions
// ==================================
export const setCurrentPageIndex = createAction(SET_CURRENT_PAGE_INDEX);

export const getHelpLinks = createAction(GET_HELP_LINKS, () => {
  return API.get(config.apiGateway.name, "/common/help-links");
});

export const createHelpLink = createAction(CREATE_HELP_LINK, (item) => {
  return API.post(config.apiGateway.name, "/admin/help-links", {
    body: item,
  });
});

export const updateHelpLink = createAction(UPDATE_HELP_LINK, (item) => {
  return API.put(
    config.apiGateway.name,
    `/admin/help-links/${item.pageIndex}`,
    {
      body: item,
    }
  );
});

// ==================================
// Action Handlers
// ==================================
const ACTION_HANDLERS = {
  [setCurrentPageIndex]: (state, action) => ({
    ...state,
    currentPageIndex: action.payload,
  }),
  [fulfilled(getHelpLinks)]: (state, action) => ({
    ...state,
    list: action.payload,
  }),
  [fulfilled(createHelpLink)]: (state, action) => ({
    ...state,
    list: [...state.list, action.payload],
  }),
  [fulfilled(updateHelpLink)]: (state, action) => {
    return {
      ...state,
      list: state.list.map((item) =>
        item.pageIndex === action.payload.pageIndex ? action.payload : item
      ),
    };
  },
};

// ==================================
// Reducer
// ==================================
const initialState = {
  currentPageIndex: "home",
  list: [],
};

export default handleActions(ACTION_HANDLERS, initialState);
