import React, { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
  Box
} from "@material-ui/core";
import DropIn from "braintree-web-drop-in";

import { subscription, loading } from "@displaygecko/dg-modules";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const mapState = state => ({
  isSubscribing: loading.isLoading(subscription.subscribeToPremiumPlan)(state)
});

const mapDispatch = {
  subscribeToPremiumPlan: subscription.subscribeToPremiumPlan,
  getSubscriptionBilling: subscription.getBillingSubscription
};

const PaymentCheckoutDialog = ({
  open,
  isSubscribing,
  onRequestClose,
  subscribeToPremiumPlan,
  getSubscriptionBilling
}) => {
  const [loading, setLoading] = useState(false);
  const [dropinInstance, setDropinInstance] = useState(null);
  useEffect(() => {
    async function asyncFunc() {
      setLoading(true);
      const clientToken = await subscription.getBraintreeClientToken();
      setLoading(false);
      DropIn.create(
        {
          authorization: clientToken,
          container: "#dropin-container"
        },
        function(err, di) {
          if (err) {
            console.error(err);
          } else {
            setDropinInstance(di);
          }
        }
      );
    }

    if (open) {
      asyncFunc();
    } else {
      setDropinInstance(null);
    }
  }, [open]);

  const handleUpgrade = useCallback(() => {
    if (dropinInstance) {
      dropinInstance.requestPaymentMethod(async function(err, payload) {
        if (err) {
          console.error(err);
        } else {
          try {
            const paymentMethodNonce = payload.nonce;
            await subscribeToPremiumPlan(paymentMethodNonce);
            getSubscriptionBilling();
            onRequestClose();
          } catch (e) {
            console.log("subscription error", e);
          }
        }
      });
    }
  }, [
    dropinInstance,
    subscribeToPremiumPlan,
    getSubscriptionBilling,
    onRequestClose
  ]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      disableBackdropClick
      disableEscapeKeyDown
      onClose={onRequestClose}
    >
      <DialogTitle>Upgrade for a full year of service for $100</DialogTitle>
      <DialogContent>
        {loading ? <Box>Loading...</Box> : <div id="dropin-container"></div>}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpgrade}
          disabled={isSubscribing || !dropinInstance}
        >
          Upgrade
        </Button>
        <Button
          variant="text"
          color="secondary"
          onClick={onRequestClose}
          disabled={isSubscribing}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default connect(mapState, mapDispatch)(PaymentCheckoutDialog);
