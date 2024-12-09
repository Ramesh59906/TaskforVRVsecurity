import React, { useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Calendar from 'react-calendar';
import { FaUsers, FaUserCheck, FaUserTimes, FaUserPlus, FaSearch, FaUserCircle } from 'react-icons/fa';
import 'react-calendar/dist/Calendar.css';
import '../Cs/Dashboard.css'; // Add your custom styles here
import { Container, Row, Col,Dropdown} from "react-bootstrap";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [date, setDate] = useState(new Date());

  const handlepop=()=>{
    alert("inprocess");
  }

  const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Active Users',
        data: [500, 700, 800, 600, 900, 1000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'New Users',
        data: [200, 300, 400, 250, 350, 400],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="dashboard-container">
 <div className="dashboard-header bg-light py-3">
      <Container fluid>
        <Row className="align-items-center">
          {/* Search Input */}
          <Col xs={12} sm={6} md={8} className="mb-2 mb-sm-0">
            <div className="d-flex align-items-center search-input bg-white px-3 py-2 rounded">
              <FaSearch className="me-2" />
              <input
                type="text"
                className="form-control border-0"
                placeholder="Search..."
                style={{ boxShadow: "none" }}
              />
            </div>
          </Col>

          {/* Profile Section with Dropdown */}
          <Col
            xs={12}
            sm={6}
            md={4}
            className="text-sm-end text-center d-none d-sm-block"
          >
            <Dropdown align="end">
              <Dropdown.Toggle
                id="dropdown-profile"
                variant="light"
                className="d-inline-flex align-items-center border-0 bg-transparent"
              >
                <FaUserCircle size={32} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handlepop} href="#">View Profile</Dropdown.Item>
                <Dropdown.Item onClick={handlepop} href="#">Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handlepop} href="#">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    </div>
      <div className="dashboard-cards">
        <div className="card">
          <FaUsers size={32} />
          <h3>Total Users</h3>
          <p>1,234</p>
        </div>
        <div className="card">
          <FaUserCheck size={32} />
          <h3>Active Users</h3>
          <p>1,000</p>
        </div>
        <div className="card">
          <FaUserTimes size={32} />
          <h3>Inactive Users</h3>
          <p>200</p>
        </div>
        <div className="card">
          <FaUserPlus size={32} />
          <h3>New Users</h3>
          <p>34</p>
        </div>
      </div>
      <div className="chart-container">
        <h3>User Analytics</h3>
        <div className="chart">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>
      {/* <div className="calendar-container">
        <h3>Calendar</h3>
        <Calendar value={date} onChange={setDate} />
      </div> */}
    </div>
  );
};

export default Dashboard;