import React from "react";
import { Card } from "semantic-ui-react";
import "./ConfirmOrder.css";
import { maskString } from "./helper";
const PaymentDetails = ({ state }) => {
  const data = state.object2;
  return (
    <Card className="shipping-card">
      <Card.Content>
        <Card.Header className="shipping-card-header">
          {data?.cardName}
        </Card.Header>
        <Card.Description className="shipping-card-description">
          <p>
            PaymentDetails:
            {`${maskString(data?.cardNumber, 3)} , ${maskString(
              data?.expiration,
              1
            )} , ${maskString(data?.cvv, 1)}`}
          </p>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};
export default PaymentDetails;
