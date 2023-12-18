import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/features/userSlice";
import { hideLoading, showLoading } from "./redux/features/alertSlice";
import Loader from "./components/Loader/Loader";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Doctors from "./pages/adminPannel/Doctors";
import Users from "./pages/adminPannel/Users";
import Profile from "./pages/doctorPannel/profile";
import DoctorAppointments from "./pages/doctorPannel/DoctorAppointments";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.alerts.loading);
  function popUpHandler(success, descMessage, headMessage) {
    if (success) {
      NotificationManager.success(descMessage, headMessage);
    } else {
      NotificationManager.error(descMessage, headMessage, 5000, () => {
        alert("callback");
      });
    }
  }
  useEffect(() => {
    dispatch(showLoading());
    axios
      .get(`/api/v1/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(hideLoading());
        const { data } = res;
        if (data.success) {
          dispatch(setUser(data.user));
        }
      })
      .catch((error) => {
        dispatch(hideLoading());
        console.log(error);
      });
  }, []);
  return (
    <>
      <NotificationContainer />
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/login"
                element={<Login popUpHandler={popUpHandler} />}
              />
              <Route
                path="/register"
                element={<Register popUpHandler={popUpHandler} />}
              />
              <Route path="/apply-doctor" element={<ApplyDoctor />} />
              <Route path="/notification" element={<NotificationPage />} />
              <Route path="/admin/doctors" element={<Doctors />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/doctor/profile/:id" element={<Profile />} />
              <Route
                path="/doctor-appointments"
                element={<DoctorAppointments />}
              />
              <Route
                path="/doctor/book-appointment/:doctorId"
                element={<BookingPage />}
              />
              <Route path="/appointments" element={<Appointments />} />
            </Routes>
          </BrowserRouter>
        </>
      )}
    </>
  );
}

export default App;
