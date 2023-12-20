import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import {  useSelector } from "react-redux";
import profileImg from "../../assests/images/profile3.jpg";
import { useNavigate } from "react-router-dom";
import  Notifications  from "../../components/Notifications/Notifications";


const Home = ({ popUpHandler }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>


      <Navbar
        openModal={openModal}
        popUpHandler={popUpHandler}
        notifShow={true}
      />
                {isModalOpen && (
        <Notifications closeModal={closeModal} popUpHandler={popUpHandler}/>
      )}
      <section className="section">
        <div className="section__container">
          <div className="content">
            <p className="subtitle">HELLO</p>
            <h1 className="title">
              <span>
                Admin {user?.name}
                <br />
              </span>
            </h1>
            <p className="description">
            Empower your administration with our intuitive interface. Easily review and manage doctors' profiles, swiftly changing their status from accepted to rejected and vice versa. Plus, maintain a safe and secure environment by having the ability to block patient profiles when necessary. Take control with our powerful admin features.
            </p>
            <div className="action__btns">
              <button
                className="hire__me"
                onClick={() => {
                  navigate("/admin/doctors");
                }}
              >
                Review Doctors
              </button>
              <button
                className="portfolio"
                onClick={() => {
                  navigate("/admin/users");
                }}
              >
                Review Users
              </button>
            </div>
            
          </div>
          <div className="image">
            <img src={profileImg} alt="profile" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
