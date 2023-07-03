import React from "react";
import { Link } from "react-router-dom";
const LoginError = () => {
  return (
    <div className="success">
      <h1>You have not Logged in!</h1>
      <h1>Please {<Link to="/">Login</Link>} before to access the e-commerce website</h1>
    </div>
  );
};

export default LoginError;
