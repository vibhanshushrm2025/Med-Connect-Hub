import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/features/loader";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Notifications from "../../components/Notifications/Notifications";

const Doctors = ({ popUpHandler }) => {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const [slideInIndices, setSlideInIndices] = useState([]);
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tableRef = useRef(null);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          doctors.forEach((_, index) => {
            setTimeout(() => {
              setSlideInIndices((prevIndices) => [...prevIndices, index]);
            }, index * 200);
          });
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (tableRef.current) {
      observer.observe(tableRef.current);
    }
  }, [doctors]);

  //getUsers
  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle account
  const handleAccountStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        console.log(res.data.message);
      }
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);
  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated]);

  return (
    <>
      <Navbar
        openModal={openModal}
        popUpHandler={popUpHandler}
        notifShow={true}
      />
      {isModalOpen && (
        <Notifications closeModal={closeModal} popUpHandler={popUpHandler} />
      )}
      <h1 className="center">DoctorsList</h1>

      <div className="appointment">
        <table className="zigzag" ref={tableRef}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr
                key={index}
                className={slideInIndices.includes(index) ? "slide-in" : ""}
              >
                <td>
                  {doctor.firstName} {doctor.lastName}
                </td>
                <td>{doctor.phone}</td>
                <td>{doctor.status}</td>
                <td>
                  {doctor.status === "pending" && (
                    <>
                      <button
                        className="statusUpdateBtn"
                        onClick={() => handleAccountStatus(doctor, "approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="statusUpdateBtn"
                        onClick={() => handleAccountStatus(doctor, "reject")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {doctor.status === "approved" && (
                    <button
                      className="statusUpdateBtn"
                      onClick={() => handleAccountStatus(doctor, "reject")}
                    >
                      Reject
                    </button>
                  )}
                  {doctor.status === "reject" && (
                    <button
                      className="statusUpdateBtn"
                      onClick={() => handleAccountStatus(doctor, "approved")}
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Doctors;
