
import React, { useState } from 'react';
import { FaBars, FaUser, FaCog, FaHome, FaUserCircle } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import '../Cs/Sidebar.css'; // Custom CSS for the sidebar

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`bg-dark sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button
        className="toggle-btn"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <FaBars />
      </button>
      <div className="profile-section">
        <FaUserCircle size={isCollapsed ? 24 : 48} />
      </div>
      {!isCollapsed && (
        <p className="profile-text d-flex justify-content-center my-1 px-0 fs-3">John Doe</p>
      )}
      <hr />
      <ul className="sidebar-menu">
        <li className={isActive('/') ? 'active' : ''}>
          <Link to="/">
            <FaHome /> <span className="menu-text">Dashboard</span>
          </Link>
        </li>
        <li className={isActive('/userlist') ? 'active' : ''}>
          <Link to="/userlist">
            <FaUser /> <span className="menu-text">Userlists</span>
          </Link>
        </li>
        {/* <li className={isActive('/edituser') ? 'active' : ''}>
          <Link to="/edituser">
            <FaCog /> <span className="menu-text">Settings</span>
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
