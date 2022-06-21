import React from "react";
import axios from "axios";
import makeToast from "../Toaster";
import { Link } from "react-router-dom";

const RegisterPage = (props) => {
  const nameRef = React.createRef();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const phoneRef = React.createRef();

  const registerUser = (props) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const phone = phoneRef.current.value;

    axios
      .post("http://localhost:8000/user/register", {
        name,
        email,
        password,
        phone,
      })
      .then((response) => {
        makeToast("success", response.data.message);
        props.history.push("/login");
      })
      .catch((err) => {
        // console.log(err);
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        )
          makeToast("error", err.response.data.message);
      });
  };

  return (
    <div className="card">
      <div className="cardHeader">Registration</div>
      <div align="right">
        <Link to="login">Allready Have A Account</Link>
      </div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="John Doe"
            ref={nameRef}
          />
        </div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="abc@example.com"
          ref={emailRef}
        />
      </div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="phone">Contact Number</label>
          <input
            type="number"
            name="phone"
            id="phone"
            placeholder="Phone Number"
            ref={phoneRef}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            ref={passwordRef}
          />
        </div>
      </div>
      <button onClick={registerUser}>Register</button>
    </div>
  );
};

export default RegisterPage;
