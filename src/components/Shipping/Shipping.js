import React, { useEffect, useState } from "react";
import { Form } from "semantic-ui-react";
import "./Shipping.css";

const ShippingForm = ({
  setShippingButton,
  setNewChosenAddress,
  addressForOrder,
}) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [cityname, setCityname] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  useEffect(() => {
    if (name && address && cityname && state && zipcode) {
      const NewChosenAddress = {
        name: name,
        address: address,
        cityname: cityname,
        state: state,
        zipcode: zipcode,
      };
      setNewChosenAddress(NewChosenAddress);
      setShippingButton(false);
    } else {
      setShippingButton(true);
    }
  }, [name, address, cityname, state, zipcode]);
  useEffect(() => {
    const { name, address, cityname, state, zipcode } = addressForOrder;
    if (name && address && cityname && state && zipcode) {
      setName(name);
      setAddress(address);
      setCityname(cityname);
      setState(state);
      setZipcode(zipcode);
    }
  }, [addressForOrder]);
  return (
    <Form className="center-form">
      <Form.Field>
        <label>Name</label>
        <input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Address</label>
        <input
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>City</label>
        <input
          placeholder="Enter your city"
          value={cityname}
          onChange={(e) => setCityname(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>State</label>
        <input
          placeholder="Enter your state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>ZIP Code</label>
        <input
          placeholder="Enter your ZIP code"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
        />
      </Form.Field>
    </Form>
  );
};

export default ShippingForm;
