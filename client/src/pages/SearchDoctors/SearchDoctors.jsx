import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Style.css";
import Card from "../../components/Card/Card";
import axios from "axios";
import {  useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const SearchDoctors = ({popUpHandler}) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [doctors, setDoctors] = useState([]);
  const [doctorsTemp,setDoctorsTemp] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    try {
      const res = await axios.get("/api/v1/users/getAllDoctors", {
        withCredentials: true,
      });
      if (res.data.success) {
        setDoctors(res.data.data);
        setDoctorsTemp(res.data.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const searchDoc = (e) => {
    const value = e.target.value;
    const temp = doctors.filter((doctor) => {
      return doctor.firstName.toLowerCase().startsWith(value.toLowerCase()) || doctor.lastName.toLowerCase().startsWith(value.toLowerCase());
    });
    setDoctorsTemp(temp);
  }
  if (!isAuthenticated) return <Navigate to="/login" />;
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar popUpHandler={popUpHandler} notifShow={false}/>
          <div class="search101">
            <input placeholder="Search by name..." type="text" onChange={searchDoc} />
            <button type="submit">Go</button>
          </div>
          <div className="doctors0">
            {doctorsTemp.map((doctor, index) => (
              <Card key={index} doctor={doctor} popUpHandler={popUpHandler} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default SearchDoctors;
