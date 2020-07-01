import React, { useMemo, useCallback, useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import moment from "moment";
import { NavLink } from "react-router-dom";
import sizeMe from "react-sizeme";
import {
  Paper,
  Box,
  Collapse,
  IconButton,
  Typography,
  makeStyles
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";

import { subscription } from "@displaygecko/dg-modules";

const useStyles = makeStyles(theme => ({
  upgradeAnchor: {
    textDecoration: "underline"
  }
}));

const mapState = state => ({
  trialBannerVisible: subscription.trialBannerVisibleSelector(state),
  billingSubscription: subscription.biilingSubscriptionSelector(state)
});

const mapDispatch = {
  setTrialBannerVisible: subscription.setTrialBannerVisible
};

function TrialModeBanner({
  size,
  trialBannerVisible,
  billingSubscription = {},
  onChangeHeight,
  setTrialBannerVisible
}) {
  const classes = useStyles();

  useEffect(() => {
    var sheet = document.createElement("style");
    if (trialBannerVisible) {
      sheet.innerHTML = ".ct-widget.ct-ignition {top: 100px !important;}";
    } else {
      sheet.innerHTML = ".ct-widget.ct-ignition {top: 54px !important;}";
    }
    document.body.appendChild(sheet);
  }, [trialBannerVisible]);

  useEffect(() => {
    onChangeHeight(size.height);
  }, [onChangeHeight, size.height]);

  const trialEndString = useMemo(() => {
    const { trialEnd } = billingSubscription;
    return moment(trialEnd).format("MMM Do, YYYY");
  }, [billingSubscription]);

  const handleClose = useCallback(() => {
    setTrialBannerVisible(false);
  }, [setTrialBannerVisible]);

  const { trialPeriod = false } = billingSubscription;

  return trialPeriod ? (
    <Collapse in={trialBannerVisible}>
      <Paper>
        <Box display="flex" alignItems="center">
          <Box flex={1} display="flex" justifyContent="center">
            <Typography color="secondary">
              Your trial ends at {trialEndString}. Please&nbsp;
              <NavLink to="/config" className={classes.upgradeAnchor}>
                upgrade
              </NavLink>{" "}
              your membership via Administration Settings.
            </Typography>
          </Box>
          <IconButton size="medium" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Paper>
    </Collapse>
  ) : null;
}

const enhance = compose(
  connect(mapState, mapDispatch),
  sizeMe({ monitorHeight: true })
);

export default enhance(TrialModeBanner);
