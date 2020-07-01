import React, { useMemo, useCallback, useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import moment from "moment";
import { NavLink } from "react-router-dom";
import sizeMe from "react-sizeme";
import { Paper, Box, Collapse, IconButton, Typography, makeStyles } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { subscription } from "@displaygecko/dg-modules";
var useStyles = makeStyles(function (theme) {
  return {
    upgradeAnchor: {
      textDecoration: "underline"
    }
  };
});

var mapState = function mapState(state) {
  return {
    trialBannerVisible: subscription.trialBannerVisibleSelector(state),
    billingSubscription: subscription.biilingSubscriptionSelector(state)
  };
};

var mapDispatch = {
  setTrialBannerVisible: subscription.setTrialBannerVisible
};

function TrialModeBanner(_ref) {
  var size = _ref.size,
      trialBannerVisible = _ref.trialBannerVisible,
      _ref$billingSubscript = _ref.billingSubscription,
      billingSubscription = _ref$billingSubscript === void 0 ? {} : _ref$billingSubscript,
      onChangeHeight = _ref.onChangeHeight,
      setTrialBannerVisible = _ref.setTrialBannerVisible;
  var classes = useStyles();
  useEffect(function () {
    var sheet = document.createElement("style");

    if (trialBannerVisible) {
      sheet.innerHTML = ".ct-widget.ct-ignition {top: 100px !important;}";
    } else {
      sheet.innerHTML = ".ct-widget.ct-ignition {top: 54px !important;}";
    }

    document.body.appendChild(sheet);
  }, [trialBannerVisible]);
  useEffect(function () {
    onChangeHeight(size.height);
  }, [onChangeHeight, size.height]);
  var trialEndString = useMemo(function () {
    var trialEnd = billingSubscription.trialEnd;
    return moment(trialEnd).format("MMM Do, YYYY");
  }, [billingSubscription]);
  var handleClose = useCallback(function () {
    setTrialBannerVisible(false);
  }, [setTrialBannerVisible]);
  var _billingSubscription$ = billingSubscription.trialPeriod,
      trialPeriod = _billingSubscription$ === void 0 ? false : _billingSubscription$;
  return trialPeriod ? React.createElement(Collapse, {
    in: trialBannerVisible
  }, React.createElement(Paper, null, React.createElement(Box, {
    display: "flex",
    alignItems: "center"
  }, React.createElement(Box, {
    flex: 1,
    display: "flex",
    justifyContent: "center"
  }, React.createElement(Typography, {
    color: "secondary"
  }, "Your trial ends at ", trialEndString, ". Please\xA0", React.createElement(NavLink, {
    to: "/config",
    className: classes.upgradeAnchor
  }, "upgrade"), " ", "your membership via Administration Settings.")), React.createElement(IconButton, {
    size: "medium",
    onClick: handleClose
  }, React.createElement(CloseIcon, null))))) : null;
}

var enhance = compose(connect(mapState, mapDispatch), sizeMe({
  monitorHeight: true
}));
export default enhance(TrialModeBanner);