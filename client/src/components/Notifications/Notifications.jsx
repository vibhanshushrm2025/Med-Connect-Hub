import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/features/loader";
import axios from "axios";
import { setUser } from "../../redux/features/auth";

const Notifications = ({ closeModal, popUpHandler }) => {
  const [notiActiveBar, setNotiActiveBar] = useState(true);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/users/get-all-notification",
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
      if (res.data.success) {
        const user = await axios.get(`/api/v1/users/me`, {
          withCredentials: true,
        });
        dispatch(setUser(user.data.user));
        popUpHandler(1, "All Notifications moved to Read", "Marked as Read");
      } else {
        popUpHandler(0, res.data.message, "Failed to Mark as Read");
      }
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      popUpHandler(0, "Something went wrong", "Failed");
    }
  };
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/users/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        const user = await axios.get(`/api/v1/users/me`, {
          withCredentials: true,
        });
        dispatch(setUser(user.data.user));
        popUpHandler(1, "All Notifications Deleted", "Deleted");
      } else {
        popUpHandler(0, res.data.message, "Failed to Delete");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      popUpHandler(0, "Something went wrong", "Failed");
    }
  };

  return (
    <>
      <div className="modal">
        <span onClick={closeModal} className="close"></span>
        <div className="notification-card">
          <div className="toggle-bar">
            <div
              className={`notiBar ${notiActiveBar ? "notiActive" : ""}`}
              onClick={() => setNotiActiveBar(true)}
            >
              New Notification
            </div>
            <div
              className={`notiBar ${notiActiveBar ? "" : "notiActive"}`}
              onClick={() => setNotiActiveBar(false)}
            >
              Read Notification
            </div>
          </div>
          {notiActiveBar ? (
            <div className="contentNoti">
              <ul className="notiList">
                {user.notifcation.map((notif, index) => {
                  return (
                    <>
                      <li key={index} style={{ paddingBottom: "10px" }}>
                        <span style={{ fontWeight: "bold" }}>{notif.type}</span>{" "}
                        <br />
                        {notif.message}
                      </li>
                    </>
                  );
                })}
              </ul>
              <div className="markRead notiChange" onClick={handleMarkAllRead}>
                Mark all Read
              </div>
            </div>
          ) : (
            <div className="contentNoti">
              <ul className="notiList">
                {user.seennotification.map((notif, index) => {
                  return (
                    <>
                      <li key={index} style={{ paddingBottom: "10px" }}>
                        <span style={{ fontWeight: "bold" }}>{notif.type}</span>{" "}
                        <br />
                        {notif.message}
                      </li>
                    </>
                  );
                })}
              </ul>
              <div
                className="deleteRead notiChange"
                onClick={handleDeleteAllRead}
              >
                Delete all Seen
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Notifications;
