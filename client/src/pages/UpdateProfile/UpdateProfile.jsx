import React from "react";
import Layout from "../../components/Layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import axios from "axios";
import moment, { updateLocale } from "moment";
import "./Style.css";
import { desetUser } from "../../redux/features/userSlice";
import Navbar from "../../components/Navbar/Navbar";
const UpdateProfile = ({ popUpHandler }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const { user } = useSelector((state) => state.user);
  // console.log(user);
  const dispatch = useDispatch();
  // if (!isAuthenticated) navigate("/login");
  //handle form
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
        // message.success(res.data.message);
        popUpHandler(true, res.data.message, "Success");
        console.log(res.data.message);
        // navigate("/");
      } else {
        // message.error(res.data.success);
        popUpHandler(false, res.data.message, "Error");
        console.log(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
    popUpHandler(false, "Somthing Went Wrrong ", "Error");
      console.log(error);
      //   message.error("Somthing Went Wrrong ");
    }
  };
  if (!isAuthenticated) return <Navigate to="/login" />;
  return (
    // <Layout><>
    <>
      <Navbar popUpHandler={popUpHandler} notifShow={false} />
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
    // </Layout>
  );
};

export default UpdateProfile;
