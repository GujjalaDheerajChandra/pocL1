import React from "react";
import { Item } from "semantic-ui-react";
import "./ConfirmOrder.css";

const CartDetails = ({ CartItems }) => {
  return (
    <Item.Group className="cart-items-incheckout" divided>
      {CartItems.allCartItems && CartItems.allCartItems.length !== 0 ? (
        <>
          {CartItems.allCartItems.map((item, index) => {
            return (
              <Item key={index}>
                <Item.Image src={item.image} />

                <Item.Content>
                  <div className="items-header-something">
                    <Item.Header>
                      <p>
                        {item.name} ({item.quantity})
                      </p>
                    </Item.Header>
                    <Item.Header>
                      <p>{`₹ ${(item.price * item.quantity).toFixed(2)}`}</p>
                    </Item.Header>
                  </div>
                  <Item.Description>{item.description}</Item.Description>
                </Item.Content>
              </Item>
            );
          })}
        </>
      ) : (
        <h1>Your Cart is empty</h1>
      )}
    </Item.Group>
  );
};

export default CartDetails;
