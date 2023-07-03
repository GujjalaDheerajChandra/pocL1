import React from "react";
import { Link, useLocation } from "react-router-dom";

function SuccessRegister() {
  const location = useLocation();
  return (
    <div className="success">
      <h1>Hi {location.state}! You have successfully signed up</h1>
      <h1>click {<Link to="/">here</Link>} to go to login page</h1>
    </div>
  );
}

export default SuccessRegister;
