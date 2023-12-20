import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {  useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Notifications from "../../components/Notifications/Notifications";

const Users = ({ popUpHandler }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tableRef = useRef(null);
  const [slideInIndices, setSlideInIndices] = useState([]);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          users.forEach((_, index) => {
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
  }, [users]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;
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
      <h1 className="center">User List</h1>

      <div className="appointment">
        <table className="zigzag" ref={tableRef}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Doctor Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className={slideInIndices.includes(index) ? "slide-in" : ""}
              >
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isDoctor ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
