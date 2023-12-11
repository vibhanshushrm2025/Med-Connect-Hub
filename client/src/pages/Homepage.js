import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Layout from "../components/Layout/Layout";
import { Row } from "antd";
import DoctorList from "../components/DoctorList";
const Home = () => {
  const [doctors, setDoctors] = useState([]);
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "/api/v1/users/getAllDoctors",
        {
          headers:{
              "Content-Type":"application/json",
          },
          withCredentials:true
      });
      
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [refresh, setRefresh] = useState(false); //  Whenver you want the whole data of the page should be refreshed ,
  // then you just change the refresh variable and whole data of the page is again fetched using useeffect

  useEffect(() => {}, [refresh]);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  

  return (
    <Layout>
      <h1 className="text-center">Home Page</h1>
      <Row>
        {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
      </Row>
    </Layout>
  );
};

export default Home;
