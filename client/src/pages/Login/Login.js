// import React from 'react'
import axios from "axios";
import {
  // BrowserRouter as Router,
  // Routes,
  // Route,
  Link,
  Navigate,
} from "react-router-dom";
// import { Context, server } from "../index";
import { useContext, useState } from "react";

import { message } from "antd";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/userSlice";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import { Wrapper } from "./Styles";
const Login = () => {
  // const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  if (isAuthenticated) return <Navigate to={"/"} />; // Navigate functionality is good .
  const submithandler = async (e) => {
    e.preventDefault();

    // one thing to notice in the below try catch block is that , when you get 404 request from the api , it treat it as a error and move to the
    // catch part , althrough if the status code 404 is sent intentionally .
    // So , I changed all the 404 response from  the api into the 201 status code
    try {
      //through axios , 1st argument ---> link , 2nd argument ---> body json , 3rd argument--->always same as below
      // setloading(true);
      dispatch(showLoading());
      const usr = await axios.post(
        `/api/v1/users/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(usr);
      const { data } = usr;
      const { message } = data;
      if (data.success) {
        // message.success(messag);
        const user = await axios.get(`/api/v1/users/me`, {
          withCredentials: true,
        });
        dispatch(setUser(user.data.user));
      } else {
        // message.error(messag);
        console.log(message);
      }
      dispatch(hideLoading());
    } catch (error) {
      // message.error("error");
      dispatch(hideLoading());
    }
  };

  return (
    <Wrapper>
      <div className="full-height-wrapper">
        <form onSubmit={submithandler}>
          <div className="container ">
            <h1 className="headingname">Med Connect Hub </h1>
          </div>

          <div className="container" >
            <div className="card101">
              <span className="login">Welcome Back !! </span>
              <div className="inputBox">
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  required="required"
                />
                <span className="user">Email</span>
              </div>

              <div className="inputBox">
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  required="required"
                />
                <span>Password</span>
              </div>
              <button type="submit" className="enter">
                Login
              </button>
              <Link to="/register"  style={{ textDecoration: "none", marginTop: "-20px", marginBottom: "-40px" }}>
                <button className="enter">
                  Register-{">"}
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default Login;
