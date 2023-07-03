import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import Confetti from "react-dom-confetti";
import "./Orders.css";
import { useNavigate } from "react-router-dom";

const OrderPlacedComponent = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setShowConfetti(true);

    return () => {
      setShowConfetti(false);
    };
  }, []);

  const confettiConfig = {
    angle: 180,
    spread: 120,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.1,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  return (
    <div className="order-placed-container">
      <div className="order-placed-content">
        <h3 className="order-placed-text">Your order has been placed</h3>
        <Button
          onClick={() => navigate("/home")}
          basic
          color="black"
          icon
          labelPosition="right"
        >
          Continue Shopping
          <i className="right chevron icon"></i>
        </Button>
      </div>
      <Confetti active={showConfetti} config={confettiConfig} />
    </div>
  );
};

export default OrderPlacedComponent;
