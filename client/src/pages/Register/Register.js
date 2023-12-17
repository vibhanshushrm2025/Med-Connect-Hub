import {
  // BrowserRouter as Router,
  // Routes,
  // Route,
  Link,
  Navigate,
} from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
// import {Context, server} from '../index'
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/userSlice";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import { Wrapper } from "./Styles";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  if (isAuthenticated) return <Navigate to={"/"} />;
  const submithandler = async (e) => {
    e.preventDefault();
    // one thing to notice in the below try catch block is that , when you get 404 request from the api , it treat it as a error and move to the
    // catch part , althrough if the status code 404 is sent intentionally .
    // So , I changed all the 404 response from  the api into the 201 status code
    try {
      //through axios , 1st argument ---> link , 2nd argument ---> body json , 3rd argument--->always same as below
      dispatch(showLoading());
      const usr = await axios.post(
        `/api/v1/users/register`,
        {
          name: name,
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
        toast.success(message);
        const user = await axios.get(`/api/v1/users/me`, {
          withCredentials: true,
        });
        dispatch(setUser(user.data.user));
      } else {
        toast.error(message);
        console.log(message);
      }
      dispatch(hideLoading());
    } catch (error) {
      toast.error("error");
      console.log(error);
    }
  };
  if (isAuthenticated) return <Navigate to={"/"} />; // Navigate functionality is good .
  return (
    <Wrapper>
      <div className="full-height-wrapper">
        <form onSubmit={submithandler}>
          <div className="container ">
            <h1 className="headingname">Med Connect Hub </h1>
          </div>

          <div className="container" >
            <div className="card101">
              <span className="login">Create Account </span>
              <div className="inputBox">
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  required="required"
                />
                <span className="user">Name</span>
              </div>
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
                Register
              </button>
              <Link to="/login"  style={{ textDecoration: "none", marginTop: "-20px", marginBottom: "-40px" }}>
                <button className="enter">
                  Login-{">"}
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default Register;
