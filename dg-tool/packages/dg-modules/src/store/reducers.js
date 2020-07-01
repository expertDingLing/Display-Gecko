import { combineReducers } from "redux";
import loadingReducer from "../modules/loading";
import userReducer from "../modules/user";
import companyReducer from "../modules/company";
import templateReducer from "../modules/template";
import screenReducer from "../modules/screen";
import versionReducer from "../modules/version";
import subscriptionReducer from "../modules/subscription";
import emailTemplateReducer from "../modules/emailTemplate";
import helpLinkReducer from "../modules/helpLink";
import tourReducer from "../modules/tour";

export const makeRootReducer = (asyncReducers) => {
  const reducers = {
    loading: loadingReducer,
    user: userReducer,
    company: companyReducer,
    template: templateReducer,
    screen: screenReducer,
    version: versionReducer,
    subscription: subscriptionReducer,
    emailTemplate: emailTemplateReducer,
    helpLink: helpLinkReducer,
    tour: tourReducer,
    ...asyncReducers,
  };
  return combineReducers(reducers);
};

export default makeRootReducer;
