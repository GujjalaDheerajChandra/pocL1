import React, { useState } from "react";
import { Accordion, Icon } from "semantic-ui-react";
import CartDetails from "./CartDetails";
import ShippingDetails from "./ShippingDetails";
import PaymentDetails from "./PaymentDetails";
import "./ConfirmOrder.css";
const ConfirmOrder = ({ state, CartItems }) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  return (
    <Accordion className="accordion-details" styled>
      <div className="each-accordion">
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={() => handleClick(0)}
        >
          <Icon className="accordion-icon" name="dropdown" />
          <p>Order Details</p>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <CartDetails CartItems={CartItems} />
        </Accordion.Content>
      </div>
      <div className="each-accordion">
        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={() => handleClick(1)}
        >
          <Icon className="accordion-icon" name="dropdown" />
          <p>Shipping Details</p>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <ShippingDetails state={state} />
        </Accordion.Content>
      </div>
      <div className="each-accordion">
        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={() => handleClick(2)}
        >
          <Icon className="accordion-icon" name="dropdown" />
          <p>Payment Details</p>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <PaymentDetails state={state} />
        </Accordion.Content>
      </div>
    </Accordion>
  );
};

export default ConfirmOrder;
