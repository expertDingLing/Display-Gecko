import _regeneratorRuntime from "/home/home/temp/dg-tool/node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator";
import _slicedToArray from "/home/home/temp/dg-tool/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Slide, Box } from "@material-ui/core";
import DropIn from "braintree-web-drop-in";
import { subscription, loading } from "@displaygecko/dg-modules";
var Transition = React.forwardRef(function Transition(props, ref) {
  return React.createElement(Slide, Object.assign({
    direction: "up",
    ref: ref
  }, props));
});

var mapState = function mapState(state) {
  return {
    isSubscribing: loading.isLoading(subscription.subscribeToPremiumPlan)(state)
  };
};

var mapDispatch = {
  subscribeToPremiumPlan: subscription.subscribeToPremiumPlan,
  getSubscriptionBilling: subscription.getBillingSubscription
};

var PaymentCheckoutDialog = function PaymentCheckoutDialog(_ref) {
  var open = _ref.open,
      isSubscribing = _ref.isSubscribing,
      onRequestClose = _ref.onRequestClose,
      subscribeToPremiumPlan = _ref.subscribeToPremiumPlan,
      getSubscriptionBilling = _ref.getSubscriptionBilling;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      dropinInstance = _useState4[0],
      setDropinInstance = _useState4[1];

  useEffect(function () {
    function asyncFunc() {
      var clientToken;
      return _regeneratorRuntime.async(function asyncFunc$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setLoading(true);
              _context.next = 3;
              return _regeneratorRuntime.awrap(subscription.getBraintreeClientToken());

            case 3:
              clientToken = _context.sent;
              setLoading(false);
              DropIn.create({
                authorization: clientToken,
                container: "#dropin-container"
              }, function (err, di) {
                if (err) {
                  console.error(err);
                } else {
                  setDropinInstance(di);
                }
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      });
    }

    if (open) {
      asyncFunc();
    } else {
      setDropinInstance(null);
    }
  }, [open]);
  var handleUpgrade = useCallback(function () {
    if (dropinInstance) {
      dropinInstance.requestPaymentMethod(function _callee(err, payload) {
        var paymentMethodNonce;
        return _regeneratorRuntime.async(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!err) {
                  _context2.next = 4;
                  break;
                }

                console.error(err);
                _context2.next = 15;
                break;

              case 4:
                _context2.prev = 4;
                paymentMethodNonce = payload.nonce;
                _context2.next = 8;
                return _regeneratorRuntime.awrap(subscribeToPremiumPlan(paymentMethodNonce));

              case 8:
                getSubscriptionBilling();
                onRequestClose();
                _context2.next = 15;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](4);
                console.log("subscription error", _context2.t0);

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, null, null, [[4, 12]]);
      });
    }
  }, [dropinInstance, subscribeToPremiumPlan, getSubscriptionBilling, onRequestClose]);
  return React.createElement(Dialog, {
    open: open,
    TransitionComponent: Transition,
    keepMounted: true,
    disableBackdropClick: true,
    disableEscapeKeyDown: true,
    onClose: onRequestClose
  }, React.createElement(DialogTitle, null, "Upgrade for a full year of service for $100"), React.createElement(DialogContent, null, loading ? React.createElement(Box, null, "Loading...") : React.createElement("div", {
    id: "dropin-container"
  })), React.createElement(DialogActions, null, React.createElement(Button, {
    variant: "contained",
    color: "primary",
    onClick: handleUpgrade,
    disabled: isSubscribing || !dropinInstance
  }, "Upgrade"), React.createElement(Button, {
    variant: "text",
    color: "secondary",
    onClick: onRequestClose,
    disabled: isSubscribing
  }, "Cancel")));
};

export default connect(mapState, mapDispatch)(PaymentCheckoutDialog);