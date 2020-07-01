import React, { useCallback } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  Elements,
  injectStripe
} from "react-stripe-elements";

const createOptions = (fontSize, padding) => {
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
        padding
      },
      invalid: {
        color: "#9e2146"
      }
    }
  };
};

function _SplitForm({ stripe }) {
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      if (stripe) {
        stripe.createToken().then(payload => console.log("[token]", payload));
      } else {
        console.log("Stripe.js hasn't loaded yet.");
      }
    },
    [stripe]
  );

  const handleBlur = () => {
    console.log("[blur]");
  };
  const handleChange = change => {
    console.log("[change]", change);
  };
  const handleFocus = () => {
    console.log("[focus]");
  };
  const handleReady = () => {
    console.log("[ready]");
  };

  return (
    <Elements>
      <form onSubmit={handleSubmit}>
        <label>
          Card number
          <CardNumberElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions()}
          />
        </label>
        <label>
          Expiration date
          <CardExpiryElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions()}
          />
        </label>
        <label>
          CVC
          <CardCVCElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions()}
          />
        </label>
      </form>
    </Elements>
  );
}

const SplitForm = injectStripe(_SplitForm);

function CreditCardForm() {
  return (
    <Elements>
      <SplitForm />
    </Elements>
  );
}

export default CreditCardForm;
