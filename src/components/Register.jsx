import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import { useMutation, gql } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import HCL_logo from "./HCL_logo.svg";
const REGISTER_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
    $email: String!
    $password: String!
  ) {
    userRegister(
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      email: $email
      password: $password
    ) {
      id
      fullName
      email
      phoneNumber
    }
  }
`;

function Register(props) {
  const history = useNavigate();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  function onChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      history("/success", { state: result.data.userRegister.fullName });
    },
    onError({ graphQLErrors }) {
      if (graphQLErrors) {
        setErrors(graphQLErrors[0].errors);
      }
    },
    variables: values,
  });

  function onSubmit(event) {
    event.preventDefault();
    addUser();
  }

  return (
    <div className="entry">
      <Grid
        textAlign="center"
        style={{ paddingTop: "50px", paddingBottom: "20px"}}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header textAlign="center">
            <Image style={{ width: "150px", height: "35px" }} src={HCL_logo} />
            <h1>Welcome to HCL Shopping portal</h1>
            <p>
              India's only shopping portal which allow free coupouns to their
              employees
            </p>
          </Header>
          <Form
            size="large"
            onSubmit={onSubmit}
            noValidate
            className={loading ? "loading" : ""}
          >
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="First Name"
                name="firstName"
                type="text"
                autoComplete="off"
                value={values.firstName}
                error={errors.firstName ? true : false}
                onChange={onChange}
              />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Last Name"
                name="lastName"
                type="text"
                autoComplete="off"
                value={values.lastName}
                error={errors.lastName ? true : false}
                onChange={onChange}
              />
              <Form.Input
                fluid
                icon="phone"
                iconPosition="left"
                placeholder="Phone Number"
                name="phoneNumber"
                type="text"
                autoComplete="off"
                value={values.phoneNumber}
                error={errors.phoneNumber ? true : false}
                onChange={onChange}
              />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                name="email"
                type="email"
                autoComplete="off"
                value={values.email}
                error={errors.email ? true : false}
                onChange={onChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                name="password"
                type="password"
                value={values.password}
                error={errors.password ? true : false}
                onChange={onChange}
              />
              <Button type="submit" color="blue" fluid size="large">
                SignUp
              </Button>
            </Segment>
          </Form>
          {Object.keys(errors).length > 0 && (
            <Message>
              {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                  <ul className="list">
                    {Object.values(errors).map((value) => (
                      <li key={value}>{value}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Message>
          )}
          <Message>
            Already have an account? <Link to="/">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default Register;
