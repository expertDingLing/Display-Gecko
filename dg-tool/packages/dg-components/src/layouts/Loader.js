import React from "react";
import { connect } from "react-redux";
import { loading } from "@displaygecko/dg-modules";

const { isLoading, getErrorMessage } = loading;

const mapState = (state, { actionCreator, selector, silent }) => ({
  loading: isLoading(actionCreator)(state),
  silent,
  result: selector(state),
  error: getErrorMessage(actionCreator)(state)
});

const Loader = ({ loading, silent, error, result, children }) =>
  loading && !silent ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>Somethign went wrong</div>
  ) : (
    children(result)
  );

export default connect(mapState)(Loader);
