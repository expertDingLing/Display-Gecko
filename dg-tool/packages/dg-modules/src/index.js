import * as loading from "./modules/loading";
import * as user from "./modules/user";
import * as company from "./modules/company";
import * as template from "./modules/template";
import * as screen from "./modules/screen";
import * as version from "./modules/version";
import * as subscription from "./modules/subscription";
import * as emailTemplate from "./modules/emailTemplate";
import * as helpLink from "./modules/helpLink";
import * as tour from "./modules/tour";

export { default as createStore } from "./store/createStore";
export {
  loading,
  user,
  company,
  template,
  screen,
  version,
  subscription,
  emailTemplate,
  helpLink,
  tour,
};
export { default as loadingReducer } from "./modules/loading";
export { default as userReducer } from "./modules/user";
export { default as companyReducer } from "./modules/company";
export { default as templateReducer } from "./modules/template";
export { default as screenReducer } from "./modules/screen";
export { default as versionReducer } from "./modules/version";
export { default as subscriptionReducer } from "./modules/subscription";
export { default as emailTemplateReducer } from "./modules/emailTemplate";
export { default as helpLinkReducer } from "./modules/helpLink";
export { default as tourReducer } from "./modules/tour";
