import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { showLoading, hideLoading } from "../../redux/features/loader";
import axios from "axios";
import "./Style.css";
import Navbar from "../../components/Navbar/Navbar";
import Notifications from "../../components/Notifications/Notifications";

const UpdateProfile = ({ popUpHandler }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const { user } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const dispatch = useDispatch();
  const handleFinish = async (values) => {
    try {
      const data = new FormData(values.target);
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/doctor/updateProfile",
        {
          ...Object.fromEntries(data),
          userId: user._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        popUpHandler(true, res.data.message, "Success");
      } else {
        popUpHandler(false, res.data.message, "Error");
      }
    } catch (error) {
      dispatch(hideLoading());
      popUpHandler(false, "Somthing Went Wrrong ", "Error");
      console.log(error);
    }
  };
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
      <div className="full-height-wrapper101">
        <form className="form" onSubmit={handleFinish}>
          <p className="title101">Update Profile </p>
          <p className="message">Personal Details </p>
          <div className="flex">
            <label>
              <input
                required
                placeholder=""
                type="text"
                name="firstName"
                className="input"
              />
              <span className="placeholder-indicator">Firstname*</span>
            </label>

            <label>
              <input
                required
                placeholder=""
                type="text"
                name="lastName"
                className="input"
              />
              <span className="placeholder-indicator">Lastname*</span>
            </label>
          </div>
          <div className="flex">
            <label>
              <input
                required
                placeholder=""
                type="email"
                name="email"
                className="input"
              />
              <span className="placeholder-indicator">Email*</span>
            </label>
            <label>
              <input
                required
                placeholder=""
                type="tel"
                name="phone"
                className="input"
              />
              <span className="placeholder-indicator">Phone No.*</span>
            </label>
          </div>
          <div className="flex">
            <label>
              <input
                required
                placeholder=""
                type="text"
                name="address"
                className="input"
              />
              <span className="placeholder-indicator">Address*</span>
            </label>
            <label>
              <input
                placeholder=""
                type="text"
                name="website"
                className="input"
              />
              <span className="placeholder-indicator">Website</span>
            </label>
          </div>
          <p className="message message2">Professional Details </p>
          <label>
            <input
              required
              placeholder=""
              type="text"
              name="specialization"
              className="input"
            />
            <span className="placeholder-indicator">Specialization*</span>
          </label>
          <label>
            <input
              required
              placeholder=""
              type="text"
              name="experience"
              className="input"
            />
            <span className="placeholder-indicator">Experience*</span>
          </label>
          <label>
            <input
              required
              placeholder=""
              type="text"
              name="feesPerCunsaltation"
              className="input"
            />
            <span className="placeholder-indicator">
              Fee per consultant (In Rs)*
            </span>
          </label>
          <button className="submit">Update</button>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
