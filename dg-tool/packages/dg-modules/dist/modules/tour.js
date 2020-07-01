import { createAction, handleActions } from "redux-actions";
import { createSelector } from "reselect";
import { ENABLE_TOUR, DISABLE_DASHBOARD_TOUR, DISABLE_CONFIGURATION_TOUR, DISABLE_SCREEN_TOUR } from "./actionTypes"; // ==================================
// Selectors
// ==================================

export const dashboardTourSelector = createSelector(state => state.tour, tour => tour.dashboardTourOpen);
export const configurationTourSelector = createSelector(state => state.tour, tour => tour.configurationTourOpen);
export const screenTourSelector = createSelector(state => state.tour, tour => tour.screenTourOpen); // ==================================
// Actions
// ==================================

export const enableTour = createAction(ENABLE_TOUR);
export const disableDashboardTour = createAction(DISABLE_DASHBOARD_TOUR);
export const disableConfigurationTour = createAction(DISABLE_CONFIGURATION_TOUR);
export const disableScreenTour = createAction(DISABLE_SCREEN_TOUR); // ==================================
// Action Handlers
// ==================================

const ACTION_HANDLERS = {
  [enableTour]: (state, action) => ({ ...state,
    dashboardTourOpen: true,
    configurationTourOpen: true,
    screenTourOpen: true
  }),
  [disableDashboardTour]: (state, action) => ({ ...state,
    dashboardTourOpen: false
  }),
  [disableConfigurationTour]: (state, action) => ({ ...state,
    configurationTourOpen: false
  }),
  [disableScreenTour]: (state, action) => ({ ...state,
    screenTourOpen: false
  })
}; // ==================================
// Reducer
// ==================================

const initialState = {
  dashboardTourOpen: true,
  configurationTourOpen: true,
  screenTourOpen: true
};
export default handleActions(ACTION_HANDLERS, initialState);