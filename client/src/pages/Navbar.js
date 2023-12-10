import  { useContext } from 'react'
import {
    Link
  } from "react-router-dom";
// import { Context, server } from '../index';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setUser,desetUser } from '../redux/features/userSlice';
const Navbar = () => {
    const dispatch = useDispatch();
    const isAuthenticated=useSelector((state)=>state.user.isAuthenticated);
  const logoutHandler = async()=>{
    // one thing to notice in the below try catch block is that , when you get 404 request from the api , it treat it as a error and move to the 
    // catch part , althrough if the status code 404 is sent intentionally . 
    // So , I changed all the 404 response from  the api into the 201 status code 
    try {
        //through axios , 1st argument ---> link , 2nd argument ---> body json , 3rd argument--->always same as below
        // setloading(true);
        const usr = await axios.get(`/api/v1/users/logout`,
        {
            withCredentials:true
        });
        const {data}=usr;
        const {message}=data; 
        if(data.success){
            dispatch(desetUser());
            toast.success(message);
        }       
        else {
            toast.error(message);
        }
        // {
        //   data.success?setIsAuthenticated(false):setIsAuthenticated(true);
        // }
        // {
        //   data.success?toast.success(message):toast.error(message);
        // }
        // setloading(false);
    } catch (error) {
        toast.error("error");
        // setloading(false);
    }
    // you can't use return statement here , why i don't know , 
  }
  return (
    <nav className='header'>
    <div>
        <h2>Todo App.</h2>
      </div>
      <article>
      <Link to="/">Home</Link>
      {
        isAuthenticated?<button onClick={logoutHandler} className='btn'>LogOut</button>:<Link to="/login">Login</Link>
      }
      <Link to="/profile">Profile</Link>
      <Link to="/register">Register</Link>
      </article>
    </nav>
  )
}

export default Navbar
