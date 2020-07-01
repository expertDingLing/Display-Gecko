import React, { useCallback } from "react";
import { CardNumberElement, CardExpiryElement, CardCVCElement, Elements, injectStripe } from "react-stripe-elements";

var createOptions = function createOptions(fontSize, padding) {
  return {
    style: {
      base: {
        fontSize: "14px",
        color: "#424770",
        letterSpacing: "0.025em",
        fontFamily: "Source Code Pro, monospace",
        "::placeholder": {
          color: "#aab7c4"
        },
        padding: padding
      },
      invalid: {
        color: "#9e2146"
      }
    }
  };
};

function _SplitForm(_ref) {
  var stripe = _ref.stripe;
  var handleSubmit = useCallback(function (e) {
    e.preventDefault();

    if (stripe) {
      stripe.createToken().then(function (payload) {
        return console.log("[token]", payload);
      });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  }, [stripe]);

  var handleBlur = function handleBlur() {
    console.log("[blur]");
  };

  var handleChange = function handleChange(change) {
    console.log("[change]", change);
  };

  var handleFocus = function handleFocus() {
    console.log("[focus]");
  };

  var handleReady = function handleReady() {
    console.log("[ready]");
  };

  return React.createElement(Elements, null, React.createElement("form", {
    onSubmit: handleSubmit
  }, React.createElement("label", null, "Card number", React.createElement(CardNumberElement, Object.assign({
    onBlur: handleBlur,
    onChange: handleChange,
    onFocus: handleFocus,
    onReady: handleReady
  }, createOptions()))), React.createElement("label", null, "Expiration date", React.createElement(CardExpiryElement, Object.assign({
    onBlur: handleBlur,
    onChange: handleChange,
    onFocus: handleFocus,
    onReady: handleReady
  }, createOptions()))), React.createElement("label", null, "CVC", React.createElement(CardCVCElement, Object.assign({
    onBlur: handleBlur,
    onChange: handleChange,
    onFocus: handleFocus,
    onReady: handleReady
  }, createOptions())))));
}

var SplitForm = injectStripe(_SplitForm);

function CreditCardForm() {
  return React.createElement(Elements, null, React.createElement(SplitForm, null));
}

export default CreditCardForm;