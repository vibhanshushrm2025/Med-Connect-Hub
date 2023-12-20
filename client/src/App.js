import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/features/auth";
import { hideLoading, showLoading } from "./redux/features/loader";
import Loader from "./components/Loader/Loader";
import ApplyDoctor from "./pages/ApplyDoctor/Applydoctor";
import Doctors from "./pages/adminPannel/Doctors";
import Users from "./pages/adminPannel/Users";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";
import Profile from "./pages/Profile/Profile";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import SearchDoctors from "./pages/SearchDoctors/SearchDoctors";
import Home from "./pages/adminPannel/Home";

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
              <Route
                path="/admin/doctors"
                element={<Doctors popUpHandler={popUpHandler} />}
              />
              <Route
                path="/admin/users"
                element={<Users popUpHandler={popUpHandler} />}
              />
              <Route
                path="/admin"
                element={<Home popUpHandler={popUpHandler} />}
              />

              <Route
                path="/login"
                element={<Login popUpHandler={popUpHandler} />}
              />
              <Route
                path="/register"
                element={<Register popUpHandler={popUpHandler} />}
              />
              <Route
                path="/apply-doctor"
                element={<ApplyDoctor popUpHandler={popUpHandler} />}
              />
              <Route
                path="/doctors-search"
                element={<SearchDoctors popUpHandler={popUpHandler} />}
              />
              <Route
                path="/update-profile"
                element={<UpdateProfile popUpHandler={popUpHandler} />}
              />
              <Route
                path="/profile"
                element={<Profile popUpHandler={popUpHandler} />}
              />
              <Route
                path="/"
                element={<HomePage popUpHandler={popUpHandler} />}
              />
            </Routes>
          </BrowserRouter>
        </>
      )}
    </>
  );
}

export default App;
