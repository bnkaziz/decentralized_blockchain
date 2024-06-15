import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SideBar() {

  const hundleSideBar = () => {
    document.getElementsByClassName('side-bar')[0].style.width='0px';
    document.getElementsByClassName('side-bar')[0].style.padding='0px';
  }
  return (
    <div className='side-bar'>
      <NavLink to='/dashboard/users' className='item-link' onClick={hundleSideBar}>
        <i className="fa-solid fa-users"></i>Users
      </NavLink>
      <NavLink to='/dashboard/user/createuser' className='item-link' onClick={hundleSideBar}>
        <i className="fa-solid fa-user-plus"></i>New User
      </NavLink>
      <NavLink to='/dashboard/user/createadmin' className='item-link' onClick={hundleSideBar}>
      <i className="fa-solid fa-user-tie"></i> New Admin
      </NavLink>
    </div>
  )
}
