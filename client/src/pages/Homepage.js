import {  useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector,useDispatch } from "react-redux";
const Home = () => {
    const dispatch=useDispatch();
    const isAuthenticated=useSelector((state)=>state.user.isAuthenticated);
  const [refresh,setRefresh]=useState(false);//  Whenver you want the whole data of the page should be refreshed , 
  // then you just change the refresh variable and whole data of the page is again fetched using useeffect
  
  
  
  useEffect(() => {
      
}, [refresh]);
if(!isAuthenticated) return <Navigate to={"/login"}/>

  return (
    <div className="container">
        <Navbar/>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
