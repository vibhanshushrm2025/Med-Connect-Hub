import { useRef, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import "./Home.css";
import profileImg from "../../assests/images/profile3.jpg";
import moment from "moment";
import  Notifications  from "../../components/Notifications/Notifications";
const Home = ({popUpHandler}) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const myRef = useRef(null);
  const appointmentRef = useRef(null);
  const tableRef = useRef(null);
  const user = useSelector((state) => state.user.user);
  console.log(user);
  const [appointments, setAppointments] = useState([]);
  const [slideInIndices, setSlideInIndices] = useState([]);
  const [appointmentsDoc, setAppointmentsDoc] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getAppointments = async () => {
    try {
      const res = await axios.post(
        "/api/v1/users/user-appointments",
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
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  
  const getAppointmentsDoc = async () => {
    try {
      const res = await axios.post("/api/v1/doctor/doctor-appointments",
      {
        userId:user._id
      },      
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        setAppointmentsDoc(res.data.data);
        console.log(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user && user._id) {
      getAppointments();
      if(user.isDoctor){
        getAppointmentsDoc();
      }
    }
  }, [user]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          appointments.forEach((_, index) => {
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
  }, [appointments]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          appointmentsDoc.forEach((_, index) => {
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
  }, [appointmentsDoc]);
  
  
  
  
  const handleStatus = async (record, status) => {
    console.log("a");
    try {
      const res = await axios.post(
        "/api/v1/doctor/update-status",
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        getAppointmentsDoc();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // delete notifications
  
  


  


  if(!isAuthenticated) return <Navigate to="/login" />;
  if(user?.isAdmin) return <Navigate to="/admin" />;
  return (
    <>
      {isModalOpen && (
        <Notifications closeModal={closeModal} popUpHandler={popUpHandler}/>
      )}


    <Navbar openModal={openModal} popUpHandler={popUpHandler} notifShow={true}/>

      <section className="section">
        <div className="section__container">
          <div className="content">
            <p className="subtitle">HELLO</p>
            <h1 className="title">
              <span>
                {user?.isDoctor?("Dr."):("")} {user?.name}
                <br />
              </span>
            </h1>
            <p className="description">
              {user?.isDoctor?("Step into the future of healthcare at Media Connect Hub Doctor! Discover a world where patients eagerly seek your expertise. Manage appointment requests effortlessly, deciding who you'll heal next. Your skills matter, and so does your income. Embrace a seamless experience where your talent shines, and rewards follow. Accept the challenge, showcase your expertise, and watch your success soar. Welcome to a hub where your medical prowess meets financial prosperity!"):
              ("Med Connect Hub: Your gateway to healthcare harmony! Effortlessly discover skilled practitioners, schedule appointments with ease, and experience tailored care. Join as a doctor, gain admin approval, and start consultations with patients—creating a holistic healthcare journey for all, under one unified platform.")}
            </p>
            {user?.isDoctor?(<div className="action__btns">
              <button
                className="hire__me"
                onClick={() => {
                  appointmentRef.current.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Your Appointment Requets{" "}
              </button>
            </div>):(<div className="action__btns">
              <button
                className="hire__me"
                onClick={() => {
                  myRef.current.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Apply For Doctor
              </button>
              <button
                className="portfolio"
                onClick={() => {
                  appointmentRef.current.scrollIntoView({ behavior: "smooth" });
                }}
              >
                My appointments{" "}
              </button>
            </div>)}
            
          </div>
          <div className="image">
            <img src={profileImg} alt="profile" />
          </div>
        </div>
      </section>
      {user?.isDoctor?(""):(<><div ref={myRef}>
        <h1 className="wte">How to become doctor ?</h1>
      </div>
      <div>
        <h1 className="dociee">
          Applying for Doctor here is <span className="easy">Easy</span>
        </h1>
      </div>
      <div className="curve" id="disco">
        <div className="circle">1</div>
        <div className="circle">2</div>
        <div className="circle">3</div>
      </div>
      <div className="text123">
        <div className="text1">
          <h1> Fill up the form</h1>
          <h1 className="textb">Fill in your details and submit the form </h1>
        </div>
        <div className="text1">
          <h1>Review By Admin</h1>
          <h1 className="textb">
            Your submitted details and documents will be reviewed by Admin .
          </h1>
        </div>
        <div className="text1">
          <h1>Treat and Earn</h1>
          <h1 className="textb">
            Treat and Earn, and Become approachable to millions' of patients
          </h1>
        </div>
      </div>
      <div className="btn-conteiner">
        <Link
          to="/apply-doctor"
          style={{ textDecoration: "none", color: "white" }}
          className="btn-content"
        >
          <span className="btn-title">Apply for doctor</span>
          <span className="icon-arrow">
            <svg width="66px" height="43px" viewBox="0 0 66 43" version="1.1" >
            <g id="arrow" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <path id="arrow-icon-one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
              <path id="arrow-icon-two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
              <path id="arrow-icon-three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
            </g>
          </svg>
          </span>
        </Link>
      </div></>)}
      

      <h1 className="center" ref={appointmentRef}>
        Your Appointments{" "}
      </h1>
      {user?.isDoctor?(<>
      <div className="appointment">
        <table className="zigzag" ref={tableRef}>
          <thead>
            <tr>
              <th>Appointment Id</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointmentsDoc.map((appoint, index) => (
              <tr
                key={index}
                className={slideInIndices.includes(index) ? "slide-in" : ""}
              >
                <td>
                  {appoint._id}
                </td>
                <td>
                  {moment(appoint.date).format("DD-MM-YYYY")} &nbsp;
                  {moment(appoint.time).format("HH:mm")}
                </td>
                <td>{appoint.status}</td>
                <td>
                  {appoint.status==="pending"?(<><button  className="statusUpdateBtn" onClick={()=>handleStatus(appoint,"approved")}>Approve</button >
                <button className="statusUpdateBtn" onClick={()=>handleStatus(appoint,"reject")}>Reject</button></>):(<></> )}
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>):(<>
      <div className="appointment">
        <table className="zigzag" ref={tableRef}>
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Date & Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appoint, index) => (
              <tr
                key={index}
                className={slideInIndices.includes(index) ? "slide-in" : ""}
              >
                <td>
                  {appoint.firstName} &nbsp; {appoint.lastName}
                </td>
                <td>
                  {moment(appoint.date).format("DD-MM-YYYY")} &nbsp;
                  {moment(appoint.time).format("HH:mm")}
                </td>
                <td>{appoint.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>)}
      <div className="footer">
        Developed and Maintained by <strong>Vibhanshu Sharma</strong>.
      </div>
      
    </>
  );
};

export default Home;
