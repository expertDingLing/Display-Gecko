import React from "react";
import { connect } from "react-redux";
import { loading } from "@displaygecko/dg-modules";
var isLoading = loading.isLoading,
    getErrorMessage = loading.getErrorMessage;

var mapState = function mapState(state, _ref) {
  var actionCreator = _ref.actionCreator,
      selector = _ref.selector,
      silent = _ref.silent;
  return {
    loading: isLoading(actionCreator)(state),
    silent: silent,
    result: selector(state),
    error: getErrorMessage(actionCreator)(state)
  };
};

var Loader = function Loader(_ref2) {
  var loading = _ref2.loading,
      silent = _ref2.silent,
      error = _ref2.error,
      result = _ref2.result,
      children = _ref2.children;
  return loading && !silent ? React.createElement("div", null, "Loading ...") : error ? React.createElement("div", null, "Somethign went wrong") : children(result);
};

export default connect(mapState)(Loader);