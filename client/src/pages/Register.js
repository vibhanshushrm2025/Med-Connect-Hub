import {
    // BrowserRouter as Router,
    // Routes,
    // Route,
    Link, Navigate,
  } from "react-router-dom";
  import { useContext, useState } from "react";
  import {toast} from "react-hot-toast";
  import axios from 'axios';
  // import {Context, server} from '../index'
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/features/userSlice";
  
  const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const isAuthenticated=useSelector((state)=>state.user.isAuthenticated);
    const dispatch = useDispatch();
    if(isAuthenticated) return <Navigate to={"/"}/>
    const submithandler = async(e)=>{
      e.preventDefault();
      console.log(name, email,password);
      // one thing to notice in the below try catch block is that , when you get 404 request from the api , it treat it as a error and move to the 
      // catch part , althrough if the status code 404 is sent intentionally . 
      // So , I changed all the 404 response from  the api into the 201 status code 
      try {
          //through axios , 1st argument ---> link , 2nd argument ---> body json , 3rd argument--->always same as below
          console.log("a");
          // setloading(true);
          const usr = await axios.post(`/api/v1/users/register`,{
              name:name,
              email:email,
              password:password
          },
          {
              headers:{
                  "Content-Type":"application/json",
              },
              withCredentials:true
          });
          
          const {data}=usr;
          const {message}=data;
          if(data.success){
            dispatch(setUser(data.user));
            toast.success(message);
          }
          else{
            toast.error(message);
          }
          // {
          //   data.success?setIsAuthenticated(true):setIsAuthenticated(false);
          // }
          // {
          //   data.success?toast.success(message):toast.error(message);
          // }
          // setloading(false);
          console.log(usr);
          console.log("a");
          // toast.success(message);
          console.log(data);
      } catch (error) {
          toast.error("error");
          console.log(error);
          // setloading(false);
  
      }
      
      
    }
    if(isAuthenticated) return <Navigate to={"/"}/>// Navigate functionality is good .
    return (
      <div className="login">
        <section>
          <form onSubmit={submithandler}>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Name"
              required
            />
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Email"
              required
            />
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              required
              placeholder="Password"
            />
            <button type="submit" >Sign Up</button>
            <h4>Or</h4>
            <Link to="/login">Log In</Link>
          </form>
        </section>
      </div>
    );
  };
  
  export default Register;
  