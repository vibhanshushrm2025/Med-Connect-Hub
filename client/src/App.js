import React, { useEffect } from 'react';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { setUser } from './redux/features/userSlice';

function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    // setloader(true);
    axios.get(`/api/v1/users/me`,{
      withCredentials:true
    }).then((res)=>{
      const {data}=res;
      if(data.success){
        dispatch(setUser(data.user));
      }
      // setloader(false);
    }).catch((error)=>{
      console.log(error);
      // setloader(false);
    })
  },[])
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<HomePage />}  />
        <Route path="/login" element={<Login />}  />
        <Route path="/register" element={<Register />}  />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
