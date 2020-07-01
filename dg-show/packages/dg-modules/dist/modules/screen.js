import { createAction, handleActions } from "redux-actions";
import { createSelector } from "reselect";
import { SET_SCREENS_SILENTLY, GET_ALL_SCREENS, GET_SCREEN, UPDATE_SCREEN, REORDER_SCREENS, CREATE_SCREEN_FROM_TEMPLATE, DELETE_SCREEN } from "./actionTypes";
import { API } from "aws-amplify";
import { fulfilled } from "./actionUtils";
import config from "../config"; // ==================================
// Selectors
// ==================================

export const screenListSelector = createSelector(state => state.screen, screen => screen.list);
export const screenSelector = screenId => createSelector(state => state.screen, screen => screen.cached[screenId]); // ==================================
// Actions
// ==================================

export const getScreen = createAction(GET_SCREEN, screenId => (_, getState) => {
  if (window.navigator.onLine) {
    return API.get(config.apiGateway.name, `/company/screens/${screenId}`);
  } else {
    return screenSelector(screenId)(getState());
  }
});
export const getAllScreens = createAction(GET_ALL_SCREENS, () => (_, getState) => {
  if (window.navigator.onLine) {
    return API.get(config.apiGateway.name, "/company/screens");
  } else {
    return screenListSelector(getState());
  }
});
export const updateScreen = createAction(UPDATE_SCREEN, screen => {
  return API.put(config.apiGateway.name, `/company/screens/${screen.id}`, {
    body: screen
  });
});
export const deleteScreen = createAction(DELETE_SCREEN, screen => {
  return API.del(config.apiGateway.name, `/company/screens/${screen.id}`);
});
export const reorderScreens = createAction(REORDER_SCREENS, (startIndex, endIndex) => (dispatch, getState) => {
  const screenList = [...screenListSelector(getState())];
  const [removed] = screenList.splice(startIndex, 1);
  screenList.splice(endIndex, 0, removed);

  if (endIndex === 0) {
    removed.orderWeight = screenList[1].orderWeight / 2;
  } else if (endIndex === screenList.length - 1) {
    removed.orderWeight = screenList[endIndex - 1].orderWeight * 2;
  } else {
    removed.orderWeight = (screenList[endIndex - 1].orderWeight + screenList[endIndex + 1].orderWeight) / 2;
  }

  dispatch({
    type: SET_SCREENS_SILENTLY,
    payload: screenList
  });
  return API.put(config.apiGateway.name, `/company/screens/${removed.id}`, {
    body: {
      orderWeight: removed.orderWeight
    }
  });
});
export const createScreenFromTemplate = createAction(CREATE_SCREEN_FROM_TEMPLATE, (template, insertIndex) => async (dispatch, getState) => {
  const screenList = [...screenListSelector(getState())];
  let orderWeight;

  if (screenList.length === 0) {
    orderWeight = 100;
  } else if (insertIndex === 0) {
    orderWeight = screenList[0].orderWeight / 2;
  } else if (insertIndex === screenList.length) {
    orderWeight = screenList[insertIndex - 1].orderWeight * 2;
  } else {
    orderWeight = (screenList[insertIndex - 1].orderWeight + screenList[insertIndex].orderWeight) / 2;
  }

  screenList.splice(insertIndex, 0, {
    id: `${Date.now()}`,
    title: template.title,
    orderWeight
  });
  dispatch({
    type: SET_SCREENS_SILENTLY,
    payload: screenList
  });
  const screen = await API.post(config.apiGateway.name, "/company/screens", {
    body: {
      templateId: template.id,
      title: `Screen using ${template.title} `,
      orderWeight,
      regionsData: {}
    }
  });
  const updatedScreenList = [...screenList];
  updatedScreenList.splice(insertIndex, 1, screen);
  dispatch({
    type: SET_SCREENS_SILENTLY,
    payload: updatedScreenList
  });
}); // ==================================
// Action Handlers
// ==================================

const ACTION_HANDLERS = {
  [fulfilled(getAllScreens)]: (state, action) => ({ ...state,
    list: action.payload
  }),
  [SET_SCREENS_SILENTLY]: (state, action) => ({ ...state,
    list: action.payload
  }),
  [fulfilled(getScreen)]: (state, action) => {
    if (!action.payload) return state;
    const screenId = action.payload.id;
    const newCached = { ...state.cached,
      [screenId]: action.payload
    };
    return { ...state,
      cached: newCached
    };
  },
  [fulfilled(updateScreen)]: (state, action) => ({ ...state,
    list: state.list.map(screen => screen.id === action.payload.id ? action.payload : screen)
  }),
  [fulfilled(deleteScreen)]: (state, action) => ({ ...state,
    list: state.list.filter(screen => screen.id !== action.payload.id)
  })
}; // ==================================
// Reducer
// ==================================

const initialState = {
  cached: {},
  list: []
};
export default handleActions(ACTION_HANDLERS, initialState);