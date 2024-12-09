import React from 'react';
import './App.css'; // Custom layout CSS
import Sidebar from './Components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import UserList from './Components/UserList';
import 'bootstrap/dist/css/bootstrap.min.css';


// import Settings from './Pages/Settings';

const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/userlist" element={<UserList />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
