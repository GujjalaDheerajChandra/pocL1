import React, { useState, useRef, useReducer } from "react";
import { reducer, initialState } from "../OrderReducer/OrderReducer";
import { Icon, Step, Form, Radio, Button } from "semantic-ui-react";
import ShippingForm from "../Shipping/Shipping";
import AddressCards from "../AddressCards/AddressCards";
import BillingForm from "../BillingForm/BillingForm";
import ConfirmOrder from "../ConfirmOrder/ConfirmOrder";
import "./checkout.css";
import { useQuery, gql, useMutation } from "@apollo/client";
import { validateCardDetails } from "./helper";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GET_ADDRESS_ID = gql`
  query getAddressById($id: ID!) {
    getAddressById(id: $id) {
      id
      name
      address
      cityname
      state
      zipcode
    }
  }
`;

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

const PLACE_ORDER = gql`
  mutation addOrder($Order: Order!) {
    addOrder(Order: $Order)
  }
`;

const DELETE_ALL = gql`
  mutation deleteAllCartItems($id: Int) {
    deleteAllCartItems(id: $id)
  }
`;

const ADD_ADDRESS = gql`
  mutation addAddress(
    $name: String!
    $cityname: String!
    $address: String!
    $state: String!
    $zipcode: String!
  ) {
    addAddress(
      name: $name
      address: $address
      cityname: $cityname
      state: $state
      zipcode: $zipcode
    )
  }
`;

const Checkout = ({ refetchCart }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { order } = state;
  const [newAddress, setNewAddress] = useState(false);
  const [existingAddress, setExistingAddress] = useState(true);
  const [shipped, setShipped] = useState(false);
  const [billed, setBilled] = useState(false);
  const [ordered, setordered] = useState(false);
  const [radioValue, setRadioValue] = useState("selectFromExisting");
  const [shippingButton, setShippingButton] = useState(false);
  const [billingButton, setBillingButton] = useState(false);
  const childRef = useRef(null);
  const [addressId, setAddressId] = useState();
  const [newChosenAddress, setNewChosenAddress] = useState();
  const [addressIdforOrder, setAddressIdforOrder] = useState("");
  const [addressForOrder, setAddressForOrder] = useState({});
  const [billingdetails, setBillingDetails] = useState({});
  const [billingdetailErrors, setBillingdetailErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (e, { value }) => {
    setRadioValue(value);
    setShippingButton(true);
    if (value === "selectFromExisting") {
      setExistingAddress(true);
      setNewAddress(false);
      setAddressForOrder({});
    } else if (value === "addNew") {
      setNewAddress(true);
      setExistingAddress(false);
      setAddressIdforOrder("");
    }
  };
  const { data: CartItems } = useQuery(GET_ALL_ITEMS, {
    variables: { id: 1 },
  });
  const { data: selectedexistingaddress, refetch } = useQuery(GET_ADDRESS_ID, {
    variables: { id: addressId },
  });
  const shippingClick = () => {
    setShipped(true);
    refetch(addressId);
    if (newAddress) {
      dispatch({ type: "Shipping", payload: newChosenAddress });
    } else if (existingAddress) {
      const { __typename, ...newObj } = selectedexistingaddress?.getAddressById;
      dispatch({
        type: "Shipping",
        payload: newObj,
      });
    }
  };
  const backfrombillingClick = () => {
    if (existingAddress) {
      setAddressIdforOrder(order.object1.id);
    } else if (newAddress) {
      setAddressForOrder(order.object1);
    }
    setShipped(false);
  };
  const billingClick = () => {
    const errors = validateCardDetails(billingdetails);
    setBillingdetailErrors({});
    const hasFalseValue = Object.values(errors).some(
      (value) => value === false
    );
    if (!hasFalseValue) {
      setBillingdetailErrors({});
      dispatch({
        type: "Billing",
        payload: billingdetails,
      });
      setBilled(true);
    } else {
      setBillingdetailErrors(errors);
      return toast.error("Please enter valid Payment Details");
    }
    const keyToExclude = "__typename";
    const newArray = CartItems?.allCartItems.map((obj) => {
      const { [keyToExclude]: excludedKey, ...rest } = obj;
      return rest;
    });
    dispatch({ type: "CartItems", payload: newArray });
  };
  const backfromConfirmOrder = () => {
    setBillingDetails(order.object2);
    setBilled(false);
  };
  const [addOrder] = useMutation(PLACE_ORDER, {
    variables: { Order: order },
  });

  const [deleteAll] = useMutation(DELETE_ALL, {
    variables: { id: 1 },
  });
  const [addAddress] = useMutation(ADD_ADDRESS, {
    variables: order.object1,
  });
  const placeOrderClick = () => {
    addOrder();
    deleteAll();
    if (newAddress) {
      addAddress();
    }
    setordered(true);
    setTimeout(() => {
      refetchCart({ id: 1 });
      navigate("/home/Orders");
    }, 500);
  };
  console.log(order, "abcdf");
  return (
    <div className="beautiful-form">
      <Step.Group width={3}>
        <Step active={!shipped}>
          <Icon name="truck" />
          <Step.Content>
            <Step.Title>Shipping</Step.Title>
            <Step.Description>Choose your shipping options</Step.Description>
          </Step.Content>
        </Step>

        <Step active={shipped && !billed}>
          <Icon name="payment" />
          <Step.Content>
            <Step.Title>Billing</Step.Title>
            <Step.Description>Enter billing information</Step.Description>
          </Step.Content>
        </Step>

        <Step active={billed && !ordered}>
          <Icon name="info" />
          <Step.Content>
            <Step.Title>Confirm Order</Step.Title>
          </Step.Content>
        </Step>
      </Step.Group>
      {!shipped && (
        <>
          <Form>
            <Form.Group widths="equal">
              <Form.Field>
                <Radio
                  label="Select From Existing Address"
                  name="radioGroup"
                  value="selectFromExisting"
                  checked={
                    radioValue === "selectFromExisting" && existingAddress
                  }
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="Add new Address"
                  name="radioGroup"
                  value="addNew"
                  checked={radioValue === "addNew" && newAddress}
                  onChange={handleChange}
                />
              </Form.Field>
            </Form.Group>
          </Form>
          {radioValue === "addNew" && (
            <ShippingForm
              addressForOrder={addressForOrder}
              setShippingButton={setShippingButton}
              setNewChosenAddress={setNewChosenAddress}
            />
          )}
          {radioValue === "selectFromExisting" && (
            <AddressCards
              addressIdforOrder={addressIdforOrder}
              setShippingButton={setShippingButton}
              setAddressId={setAddressId}
            />
          )}
        </>
      )}
      {shipped && !billed && (
        <BillingForm
          billingdetails={billingdetails}
          setBillingButton={setBillingButton}
          setBillingDetails={setBillingDetails}
          billingdetailErrors={billingdetailErrors}
        />
      )}
      {billed && !ordered && (
        <ConfirmOrder state={order} CartItems={CartItems} />
      )}
      {!shipped && (
        <Button
          disabled={shippingButton}
          onClick={shippingClick}
          className="checkout-button"
          positive
        >
          Proceed To Billing
        </Button>
      )}
      {shipped && !billed && (
        <>
          <Button
            onClick={backfrombillingClick}
            className="billing-button"
            basic
            color="green"
          >
            Edit the shipping details
          </Button>
          <Button
            disabled={billingButton}
            onClick={billingClick}
            className="billing-button"
            positive
          >
            next
          </Button>
        </>
      )}
      {billed && !ordered && (
        <>
          <Button onClick={backfromConfirmOrder} basic color="green">
            Edit the billing details
          </Button>
          <Button
            onClick={placeOrderClick}
            className="ordering-button"
            positive
          >
            Place Your Order
          </Button>
        </>
      )}
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        draggable
        theme="colored"
      />
    </div>
  );
};

export default Checkout;
