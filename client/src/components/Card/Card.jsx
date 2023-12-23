import React, { useState } from "react";
import "./Style.css";
import moment from "moment";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Card = ({ doctor,popUpHandler }) => {
  const [date, setDate] = useState("");
  const user = useSelector((state)=>state.user.user);
  const [time, setTime] = useState();
  const [disable, setDisable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleAvailability = async () => {
    try {
      if (!date && !time) {
        return alert("Date & Time Required");
      }
      // dispatch(showLoading());
      setDisable(true);
      const res = await axios.post(
        "/api/v1/users/booking-availbility",
        { doctorId: doctor._id, date, time },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setDisable(false);
      // dispatch(hideLoading());
      if (res.data.success) {
        popUpHandler(true,"Slot is Available","Proceed to book");
        // console.log("available ");
      } else {
        popUpHandler(false,res.data.message,"Try another time slot");
        // console.log(res.data.message);
      }
    } catch (error) {
      // dispatch(hideLoading());
      popUpHandler(false,"SomeThing Went Wrong","Server Down");
      console.log(error);
    }
  };
  // =============== booking func
  const handleBooking = async () => {
    try {
      if (!date && !time) {
        return alert("Date & Time Required");
      }
      // dispatch(showLoading());
      setDisable(true);
      const res = await axios.post(
        "/api/v1/users/book-appointment",
        {
          doctorId: doctor._id,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setDisable(false);
      // dispatch(hideLoading());
      if (res.data.success) {
        popUpHandler(true,"Slot is booked ","Congrats!");
        navigate('/');
        // console.log("booked");

      }
      else{
        // console.log(res.data.message);
        popUpHandler(false,res.data.message,"Booking failed");
      }
    } catch (error) {
      // dispatch(hideLoading());
      popUpHandler(false,"SomeThing Went Wrong","Server Down");
      console.log(error);
    }
  };
  return (
    <>
      {isModalOpen && (
        <div className="modal">
          <span onClick={closeModal} className="close"></span>

          <div className="notification-card notification-card1">
            <div className="card122 card121">
              <div className="card-details">
                <p className="text-title">
                  Dr.&nbsp;{doctor.firstName}&nbsp;{doctor.lastName}
                </p>
                <p className="text-body boldtxt">
                  Fees :&nbsp;{doctor.feesPerCunsaltation} Rs
                </p>
                <p className="text-body boldtxt">
                  Contact :&nbsp;{doctor.email}
                </p>
                <p className="text-body boldtxt">
                  Specialization :&nbsp;{doctor.specialization}{" "}
                </p>
              </div>

              <div className="inputBtn boldtxt">
                Select Data&nbsp;&nbsp; &nbsp;&nbsp;
                <input
                  type="date"
                  onChange={(value) => {
                    setDate(moment(value.target.value).format("DD-MM-YYYY"));
                  }}
                />
              </div>
              <div className="inputBtn boldtxt">
                Select Time&nbsp; &nbsp;&nbsp;&nbsp;
                <input
                  type="time"
                  onChange={(value) => {
                    setTime(value.target.value);
                  }}
                />
              </div>

              <button className={`bookBtn ${disable?'disableBt':''}`} onClick={handleAvailability}  >Check Availability</button>
              <button className={`bookBtn ${disable?'disableBt':''}`} onClick={handleBooking} >Book Appointment</button>
            </div>
          </div>
        </div>
      )}
      <div className="card121">
        <div className="card-details">
          <p className="text-title">
            Dr.&nbsp;{doctor.firstName}&nbsp;{doctor.lastName}
          </p>
          <p className="text-body">
            Experience :&nbsp;{doctor.experience} years
          </p>
          <p className="text-body">Contact :&nbsp;{doctor.email}</p>
          <p className="text-body">
            Specialization :&nbsp;{doctor.specialization}{" "}
          </p>
        </div>
        <button
          className="card-button"
          onClick={() => {
            openModal();
          }}
        >
          Book a slot
        </button>
      </div>
    </>
  );
};

export default Card;
