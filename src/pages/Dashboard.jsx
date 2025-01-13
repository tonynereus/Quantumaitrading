import React, { useState, useContext, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import DashHeader from '../components/DashHeader';
import Sidebar from '../components/Sidebar';
import AppContext from '../context/AppContext';
import { Typography } from 'antd';
import Swal from 'sweetalert2';
import BackButton from '../components/BackBtn';

function Redirect() {
  Swal.fire({
    icon: "error",
    title: "Unauthorized",
    text: "Invalid or expired login session"
  }).then(x => {
    const nav = useNavigate();
    nav("/");
  })
  return (
    <>
      <Typography.Title level={3}>Unauthorized</Typography.Title>
    </>
  );
}

function Dashboard() {
  const AppC = useContext(AppContext);
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // useEffect(() => {
  //   if (!AppC.token || !AppC.data || !AppC.data.firstN) {
  //     AppC.setLogin(location.state.data, location.state.token);
  //   }
  // }, []);

  const validToken = (AppC.token || (location.state && location.state.token));
  const validData = (AppC.data || (location.state && location.state.data));

  if (!validToken || !validData)
    return <Redirect />

  return (
    <div className="d-flex w-100 " id="wrapper" style={{height:"100vh"}}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div id="page-content-wrapper" className='overflow-auto'>
        <DashHeader onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <div className="container-fluid">
          <div>
            <BackButton />
          </div>
          <div>
            <Outlet />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
