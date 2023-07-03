import React, { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";

import Protected from "./Protected";
import Login from "./login";
import Register from "./Register";
import SuccessRegister from "./SuccessRegister";
import Home from "./Home";
import LoginError from "./LoginError";
function Entry() {
  const isLogin = useRef(false);
  // useEffect(() => {
  //   if(localStorage.getItem('isLoggedIn' === 1)){
  //     setIsLogin(true);
  //   }

  // }, []);

  function onlogin() {
    isLogin.current = true
  }
  function onlogout() {
    isLogin.current = false
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login onlogin={onlogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<SuccessRegister />} />
        <Route path="/auth" element={<LoginError />} />
        <Route
          path="/home/*"
          element={
            <Protected isLoggedIn={isLogin}>
              <Home onlogout={onlogout} />
            </Protected>
          }
        />
      </Routes>
    </div>
  );
}

export default Entry;

// element={isLogin ? <Home onlogout={onlogout} /> : <LoginError />}
