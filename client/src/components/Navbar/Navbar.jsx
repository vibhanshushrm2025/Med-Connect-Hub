import React from "react";
import { Link } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/features/loader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { desetUser } from "../../redux/features/auth";

const Navbar = ({ openModal, popUpHandler, notifShow }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const handleLogout = async () => {
    try {
      dispatch(showLoading());
      const usr = await axios.get(`/api/v1/users/logout`, {
        withCredentials: true,
      });
      const { data } = usr;
      const { message } = data;
      if (data.success) {
        popUpHandler(true, "Log Out Successfully ", "Have a nice day!");
        dispatch(desetUser());
      } else {
        popUpHandler(false, "Log Out Failed ", message);
      }
      dispatch(hideLoading());
    } catch (error) {
      popUpHandler(false, "Somthing Went Wrrong ", "Error");
    }
  };
  return (
    <div>
      <nav>
        <div className="nav___content">
          <div className="logo101">
            <Link to="/">MedConnectHub</Link>
          </div>
          <label htmlFor="check" className="checkbox">
            <i className="ri-menu-line"></i>
          </label>
          <input type="checkbox" name="check" id="check" />
          <ul id="navbaar">
            <li>
              <Link to="/">Home</Link>
            </li>
            {user?.isAdmin ? (
              ""
            ) : user?.isDoctor ? (
              <li>
                <Link to="/update-profile">Update Profile</Link>
              </li>
            ) : (
              <li>
                <Link to="/doctors-search">Search Doctors</Link>
              </li>
            )}

            {notifShow ? (
              <li>
                <Link to="#" onClick={openModal}>
                  Notifications
                  <span style={{ color: "#336dea" }}>
                    {"("}
                    {user?.notifcation.length}
                    {")"}
                  </span>
                </Link>
              </li>
            ) : (
              ""
            )}

            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li onClick={handleLogout}>
              <Link to="/login">Logout</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
