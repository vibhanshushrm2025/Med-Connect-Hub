import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/auth";
import { hideLoading, showLoading } from "../../redux/features/loader";
import { Wrapper } from "./Styles";
const Login = ({ popUpHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  if (isAuthenticated) return <Navigate to={"/"} />;
  const submithandler = async (e) => {
    e.preventDefault();
    try {
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
      const { data } = usr;
      const { message } = data;
      if (data.success) {
        const user = await axios.get(`/api/v1/users/me`, {
          withCredentials: true,
        });
        dispatch(setUser(user.data.user));
        dispatch(hideLoading());
        popUpHandler(true, "LogIn Successfull", "Welcome Back !");
      } else {
        dispatch(hideLoading());
        popUpHandler(false, "LogIn Failed", message);
      }
    } catch (error) {
      dispatch(hideLoading());
      popUpHandler(false, "LoggedIn Failed", "Something Went Wrong");
    }
  };

  return (
    <Wrapper>
      <div className="full-height-wrapper">
        <form onSubmit={submithandler}>
          <div className="container ">
            <h1 className="headingname">Med Connect Hub </h1>
          </div>

          <div className="container">
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
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  marginTop: "-20px",
                  marginBottom: "-40px",
                }}
              >
                <button className="enter">Register-{">"}</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default Login;
