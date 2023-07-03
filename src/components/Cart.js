import React from "react";
import { Button, Item } from "semantic-ui-react";
import { useQuery, useMutation, gql } from "@apollo/client";
import "../App.css";
import { useNavigate } from "react-router-dom";

const GET_ALL_ITEMS = gql`
  query getcartItems($id: Int) {
    allCartItems(id: $id) {
      name
      productId
      description
      price
      image
      quantity
    }
  }
`;

const DELETE_ITEM = gql`
  mutation deletecartItem($productId: Int!) {
    deleteCartItem(productId: $productId)
  }
`;

function Cart(props) {
  const [deletecartItem] = useMutation(DELETE_ITEM, {
    update(_, result) {
      props.onDeleteItemClick();
    },
  });
  const { loading, error, data } = useQuery(GET_ALL_ITEMS, {
    variables: { id: 1 },
  });
  const navigate = useNavigate();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  const getTotal = (array) => {
    let total = 0;

    for (let i = 0; i < array.length; i++) {
      const object = array[i];
      const price = Number(object.price);
      const quantity = Number(object.quantity);

      total += Number((price * quantity).toFixed(2));
    }

    return total.toFixed(2);
  };
  return (
    <div>
      <Item.Group divided>
        {data.allCartItems && data.allCartItems.length !== 0 ? (
          <>
            {data.allCartItems.map((item, index) => {
              return (
                <Item key={index}>
                  <Item.Image src={item.image} />
                  <Item.Content>
                    <Item.Header>{item.name}</Item.Header>
                    <Item.Header className="quantity">
                      Quantity: {item.quantity}
                    </Item.Header>
                    <Item.Header className="amount">
                      Total : {item.quantity} x {item.price} = ₹
                      {(item.price * item.quantity).toFixed(2)}
                    </Item.Header>
                    <Item.Description>{item.description}</Item.Description>
                    <Item.Extra>
                      <Button primary floated="right">
                        Buy instantly
                      </Button>
                      <Button
                        onClick={() => {
                          deletecartItem({
                            variables: { productId: item.productId },
                          });
                        }}
                        basic
                        color="red"
                        floated="right"
                      >
                        Delete Item
                      </Button>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              );
            })}
            <Button
              onClick={() => navigate("/home/checkout")}
              primary
              className="buy-button"
              animated="fade"
            >
              <Button.Content visible>Proceed to buy</Button.Content>
              <Button.Content hidden>
                ₹{getTotal(data.allCartItems)}
              </Button.Content>
            </Button>
          </>
        ) : (
          <h1>Your Cart is empty</h1>
        )}
      </Item.Group>
    </div>
  );
}

export default Cart;
