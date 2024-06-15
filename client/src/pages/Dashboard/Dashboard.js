import React from 'react';
import TopBar from '../../components/TopBar';
import SideBar from '../../components/SideBar';
import { Outlet } from 'react-router-dom';

import './dashboard.css';

export default function Dashboard() {
  return (
    <div className='dashboard'>
      <TopBar />
      <div className='content-flex'>
        <SideBar />
        <div className='inside'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}
