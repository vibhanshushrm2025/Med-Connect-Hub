import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Notifications from "../../components/Notifications/Notifications";
import './Styles.css';
import axios from "axios";
import profileImg from "../../assests/images/profile.jpg";
const Profile = ({ popUpHandler }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const { user } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctor, setDoctor] = useState({
    firstName: "Not Applicable",
    lastName: "",
    experience: "Not Applicable",
    specialization: "Not Applicable",
    phone: "Not Applicable",
    website: "Not Applicable",
    feesPerCunsaltation: "Not Applicable",
  });
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const getDoctorDetails = async () => {
    try {
      // dispatch(showLoading());
      const usr = await axios.post(
        `/api/v1/doctor/getDoctorInfo`,
        {
          userId: user._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const { data } = usr;
      if (data.success) {
        setDoctor(data.data);
        // console.log(data.data);
        // dispatch(hideLoading());
        // popUpHandler(true, "LogIn Successfull", "Welcome Back !");
      } else {
        // dispatch(hideLoading());
        // popUpHandler(false, "LogIn Failed", message);
      }
    } catch (error) {
      // dispatch(hideLoading());
      popUpHandler(false, "Can't fetch doctor info ", "Server Down");
    }
  };

  useEffect(() => {
  if(user && user?.isDoctor){
    getDoctorDetails();
    // console.log("user",user);
  }},[user]);
  
  if (!isAuthenticated) return <Navigate to="/login" />;
  return (
    <>
      <Navbar
        popUpHandler={popUpHandler}
        notifShow={true}
        openModal={openModal}
      />
      {isModalOpen && (
        <Notifications closeModal={closeModal} popUpHandler={popUpHandler} />
      )}
      <div class="profileCard container rounded bg-white mt-5 mb-5  ">
        <div class="row ">
          <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                class="rounded-circle mt-5"
                width="150px"
                src={profileImg}
              alt="userImage"/>
              <span class="font-weight-bold">{user.name}</span>
              <span class="text-black-50">{user.email}</span>
              <span> </span>
            </div>
          </div>
          <div class="col-md-5 border-right">
            <div class="p-3 py-5">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right">General User Details</h4>
              </div>
              <div class="row mt-3 usrDetail">
                <div class="col-md-12">
                  <span class="keyProp">Is Doctor:</span> <span class="valProp"> {user.isDoctor?("Yes"):("No")}</span>
                </div>
                <div class="col-md-12">
                <span class="keyProp">Is Admin : </span>{user.isAdmin?("Yes"):("No")}
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right">General Doctor Details</h4>
              </div>
              <div class="row mt-3">
              <div class="col-md-12">
                  <span class="keyProp1">Full Name :</span> <span class="valProp"> {doctor.firstName} {doctor.lastName}</span>
                </div>
                <div class="col-md-12">
                  <span class="keyProp1">Experience :</span> <span class="valProp"> {doctor.experience} years</span>
                </div>
                <div class="col-md-12">
                  <span class="keyProp1">Specialization : </span> <span class="valProp"> {doctor.specialization}</span>
                </div>
                <div class="col-md-12">
                  <span class="keyProp1">Phone no.</span> <span class="valProp"> {doctor.phone}</span>
                </div>
                <div class="col-md-12">
                  <span class="keyProp1">Website : </span> <span class="valProp"> {doctor.website}</span>
                </div>
                <div class="col-md-12">
                  <span class="keyProp1">Fee per Consultation : </span> <span class="valProp"> {doctor.feesPerCunsaltation} Rs</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Profile;
