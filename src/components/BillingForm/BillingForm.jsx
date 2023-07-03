import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "semantic-ui-react";
import "./BillingForm.css";

const BillingForm = ({
  billingdetails,
  setBillingButton,
  setBillingDetails,
  billingdetailErrors,
}) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCVV] = useState("");
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (cardNumber.length !== 16 || cvv.length !== 3) {
      return;
    }
    setCardNumber("");
    setCardName("");
    setExpiration("");
    setCVV("");
  };

  useEffect(() => {
    if (cardNumber && cardName && expiration && cvv) {
      const NewBillingDetails = {
        cardNumber: cardNumber,
        cardName: cardName,
        expiration: expiration,
        cvv: cvv,
      };
      setBillingDetails(NewBillingDetails);
      setBillingButton(false);
    } else {
      setBillingButton(true);
    }
  }, [cardNumber, cardName, expiration, cvv]);
  useEffect(() => {
    const { cardNumber, cardName, expiration, cvv } = billingdetails;
    if (cardNumber && cardName && expiration && cvv) {
      setCardNumber(cardNumber);
      setCardName(cardName);
      setExpiration(expiration);
      setCVV(cvv);
    }
  }, [billingdetails]);
  return (
    <Form className="center-form">
      <Form.Field>
        <label>Card Number</label>
        <Input
          className={
            Object.keys(billingdetailErrors).length > 0 &&
            !billingdetailErrors.cardNumber
              ? "error-input"
              : ""
          }
          placeholder="Enter card number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Card Name</label>
        <Input
          placeholder="Enter card name"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Expiration Date</label>
        <Input
          className={
            Object.keys(billingdetailErrors).length > 0 &&
            !billingdetailErrors.expiration
              ? "error-input"
              : ""
          }
          placeholder="MM/YYYY"
          value={expiration}
          onChange={(e) => setExpiration(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>CVV</label>
        <Input
          className={
            Object.keys(billingdetailErrors).length > 0 &&
            !billingdetailErrors.cvv
              ? "error-input"
              : ""
          }
          placeholder="Enter CVV"
          value={cvv}
          onChange={(e) => setCVV(e.target.value)}
        />
      </Form.Field>
    </Form>
  );
};

export default BillingForm;
