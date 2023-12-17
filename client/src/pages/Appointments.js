import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./../components/Layout/Layout";
import moment from "moment";
import { Table } from "antd";
import { useSelector } from "react-redux";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const user = useSelector((state)=>state.user.user);
  const getAppointments = async () => {
    try {
      const res = await axios.post("/api/v1/users/user-appointments", 
      {
        userId:user._id
      },      
      {
        headers:{
            "Content-Type":"application/json",
        },
        withCredentials:true
    });
      if (res.data.success) {
        console.log(res);
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      getAppointments();
    }
  }, [user]);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   render: (text, record) => (
    //     <span>
    //       {record.doctorInfo.firstName} {record.doctorInfo.lastName}
    //     </span>
    //   ),
    // },
    // {
    //   title: "Phone",
    //   dataIndex: "phone",
    //   render: (text, record) => <span>{record.doctorInfo.phone}</span>,
    // },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <Layout>
      <h1>Appoinmtnets Lists</h1>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default Appointments;
