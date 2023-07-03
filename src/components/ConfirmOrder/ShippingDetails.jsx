import React from "react";
import { Card } from "semantic-ui-react";
import "./ConfirmOrder.css";
const ShippingDetails = ({ state }) => {
  const data = state.object1;
  return (
    <Card className="shipping-card">
      <Card.Content>
        <Card.Header className="shipping-card-header">{data?.name}</Card.Header>
        <Card.Description className="shipping-card-description">
          {data?.address}
        </Card.Description>
        <Card.Description className="shipping-card-description">
          {data?.cityname}
        </Card.Description>
        <Card.Description className="shipping-card-description">
          {data?.state}
        </Card.Description>
        <Card.Description className="shipping-card-description">
          {data?.zipcode}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};
export default ShippingDetails;
