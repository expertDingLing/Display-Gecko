import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Button,
  Typography
} from "@material-ui/core";
import moment from "moment";

import {
  PaymentCheckoutDialog,
  ConfirmationDialog
} from "@displaygecko/dg-components";
import { subscription, loading } from "@displaygecko/dg-modules";
import { useToggle } from "../../helpers";

const mapState = state => ({
  isTrial: subscription.isTrialSelector(state),
  isTrialExpired: subscription.isTrialExpiredSelector(state),
  isActive: subscription.isActiveSelector(state),
  isPending: subscription.isPendingSelector(state),
  isCanceled: subscription.isCanceledSelector(state),
  isPastDue: subscription.isPastDueSelector(state),
  billingSubscription: subscription.biilingSubscriptionSelector(state),
  isCanceling: loading.isLoading(subscription.cancelPremiumPlan)(state)
});

const mapDispatch = {
  cancelPremiumPlan: subscription.cancelPremiumPlan,
  getSubscriptionBilling: subscription.getBillingSubscription
};

function PaymentInformation({
  isTrial,
  isTrialExpired,
  isActive,
  isPending,
  isCanceled,
  isPastDue,
  isCanceling,
  billingSubscription,
  cancelPremiumPlan,
  getSubscriptionBilling
}) {
  const [dropinModalOpen, setDropinModalOpen] = useState(false);
  const [confirmDialogOption, setConfirmDialogOption] = useState({});

  const {
    on: confirmDialogOpen,
    setOn: showConfirmDialog,
    setOff: closeConfirmDialog
  } = useToggle();

  const handleCancelMembership = useCallback(() => {
    const option = {
      title: "Cancel subscription",
      contentText: "Are you sure that you want to cancel this subscription?",
      yesHandler: async () => {
        closeConfirmDialog();
        try {
          await cancelPremiumPlan();
          getSubscriptionBilling();
        } catch (e) {
          console.log("cancel error", e);
        }
      },
      noHandler: () => {
        closeConfirmDialog();
      }
    };

    setConfirmDialogOption(option);
    showConfirmDialog();
  }, [
    closeConfirmDialog,
    showConfirmDialog,
    cancelPremiumPlan,
    getSubscriptionBilling
  ]);

  return (
    <>
      <Card>
        <CardHeader title="Membership" />
        <CardContent>
          {isTrial && (
            <Box>
              <Typography>
                You're on the free trial plan. The trial mode will expire on{" "}
                {moment(billingSubscription.trialEnd).format("MMM Do, YYYY")}
              </Typography>
              <Box mt={1}>
                <Button
                  data-tut="reactour_configuration_update_membership"
                  variant="contained"
                  color="primary"
                  onClick={() => setDropinModalOpen(true)}
                >
                  Upgrade Membership
                </Button>
              </Box>
            </Box>
          )}
          {isTrialExpired && (
            <Box>
              <Typography>
                Your free trial plan expired. You are not able to use the
                premium features.
              </Typography>
              <Box mt={1}>
                <Button
                  data-tut="reactour_configuration_update_membership"
                  variant="contained"
                  color="primary"
                  onClick={() => setDropinModalOpen(true)}
                >
                  Upgrade Membership
                </Button>
              </Box>
            </Box>
          )}
          {isCanceled && (
            <Box>
              <Typography>
                The subscription was canceled at{" "}
                {moment(billingSubscription.canceledAt).format("MMM Do, YYYY")}
              </Typography>
              <Box mt={1}>
                <Button
                  data-tut="reactour_configuration_update_membership"
                  variant="contained"
                  color="primary"
                  onClick={() => setDropinModalOpen(true)}
                >
                  Upgrade Membership Again
                </Button>
              </Box>
            </Box>
          )}
          {isPastDue && (
            <Box>
              <Typography color="error">
                Your credit card has a problem
              </Typography>
              <Box mt={1}>
                <Button
                  data-tut="reactour_configuration_update_membership"
                  variant="contained"
                  color="primary"
                  onClick={() => setDropinModalOpen(true)}
                >
                  Change Credit Card
                </Button>
              </Box>
            </Box>
          )}
          {isPending && (
            <Box>
              <Typography>
                You are on the premium plan. You'll be charged on{" "}
                {moment(billingSubscription.nextBillingDate).format(
                  "MMM Do, YYYY"
                )}
              </Typography>
              <Box mt={1}>
                <Button
                  data-tut="reactour_configuration_update_membership"
                  variant="text"
                  color="primary"
                  onClick={handleCancelMembership}
                  disabled={isCanceling}
                >
                  Cancel Membership
                </Button>
              </Box>
            </Box>
          )}
          {isActive && (
            <Box>
              <Typography>
                Your billing period started at{" "}
                {moment(billingSubscription.billingPeriodStartDate).format(
                  "MMM Do, YYYY"
                )}{" "}
                and will end at{" "}
                {moment(billingSubscription.billingPeriodEndDate).format(
                  "MMM Do, YYYY"
                )}
              </Typography>
              <Box ml={1}>
                <Button
                  data-tut="reactour_configuration_update_membership"
                  variant="text"
                  color="primary"
                  onClick={handleCancelMembership}
                  disabled={isCanceling}
                >
                  Cancel Membership
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
      <PaymentCheckoutDialog
        open={dropinModalOpen}
        onRequestClose={() => setDropinModalOpen(false)}
      />
      <ConfirmationDialog
        open={confirmDialogOpen}
        onRequestClose={closeConfirmDialog}
        options={confirmDialogOption}
      />
    </>
  );
}

export default connect(mapState, mapDispatch)(PaymentInformation);
