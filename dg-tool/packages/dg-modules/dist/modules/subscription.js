import { createAction, handleActions } from "redux-actions";
import { createSelector } from "reselect";
import { GET_BILLING_SUBSCRIPTION, SUBSCRIBE_PREMIUM_PLAN, CANCEL_PREMIUM_PLAN, SET_TRIAL_BANNER_VISIBLE } from "./actionTypes";
import { API } from "aws-amplify";
import { fulfilled } from "./actionUtils";
import config from "../config"; // ==================================
// Selectors
// ==================================

export const biilingSubscriptionSelector = createSelector(state => state.subscription, subscription => subscription.data);
export const trialBannerVisibleSelector = createSelector(state => state.subscription, subscription => subscription.trialBannerVisible);
export const isTrialSelector = createSelector(biilingSubscriptionSelector, subscription => {
  const {
    trialPeriod,
    status
  } = subscription || {};
  return trialPeriod && status !== "Active" && status !== "Pending";
});
export const isActiveSelector = createSelector(biilingSubscriptionSelector, subscription => {
  const {
    status
  } = subscription || {};
  return status === "Active";
});
export const isPendingSelector = createSelector(biilingSubscriptionSelector, subscription => {
  const {
    status
  } = subscription || {};
  return status === "Pending";
});
export const isCanceledSelector = createSelector(biilingSubscriptionSelector, subscription => {
  const {
    trialPeriod,
    status
  } = subscription || {};
  return !trialPeriod && status === "Canceled";
});
export const isPastDueSelector = createSelector(biilingSubscriptionSelector, subscription => {
  const {
    status
  } = subscription || {};
  return status === "PastDue";
});
export const isTrialExpiredSelector = createSelector(biilingSubscriptionSelector, subscription => {
  const {
    trialPeriod,
    status
  } = subscription || {};
  return !trialPeriod && status === "None";
}); // ==================================
// Actions
// ==================================

export const setTrialBannerVisible = createAction(SET_TRIAL_BANNER_VISIBLE);
export const getBillingSubscription = createAction(GET_BILLING_SUBSCRIPTION, () => {
  return API.get(config.apiGateway.name, "/company/billing/get");
});
export const getBraintreeClientToken = () => {
  return API.get(config.apiGateway.name, "/company/billing/client-token");
};
export const subscribeToPremiumPlan = createAction(SUBSCRIBE_PREMIUM_PLAN, paymentMethodNonce => {
  return API.post(config.apiGateway.name, "/company/billing/subscribe", {
    body: {
      paymentMethodNonce
    }
  });
});
export const cancelPremiumPlan = createAction(CANCEL_PREMIUM_PLAN, () => {
  return API.post(config.apiGateway.name, "/company/billing/cancel");
}); // ==================================
// Action Handlers
// ==================================

const ACTION_HANDLERS = {
  [fulfilled(getBillingSubscription)]: (state, action) => {
    const {
      trialPeriod,
      status
    } = action.payload;
    return { ...state,
      data: action.payload,
      trialBannerVisible: trialPeriod && status !== "Active" && status !== "Pending"
    };
  },
  [setTrialBannerVisible]: (state, action) => ({ ...state,
    trialBannerVisible: action.payload
  })
}; // ==================================
// Reducer
// ==================================

const initialState = {
  data: {}
};
export default handleActions(ACTION_HANDLERS, initialState);