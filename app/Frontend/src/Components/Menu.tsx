import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { UserContext } from '../Context/UserContext';

export default function Menu() {
  const userContext = useContext(UserContext);
  //   const [isActivityOpen, setIsActivityOpen] = useState(false);
  //   const toggleAcivityDropdown = () => {
  //     setIsActivityOpen((prevState) => !prevState);
  //   };
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="index3.html" className="brand-link">
        <img
          src="dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: '.8' }}
        />
        <span className="brand-text font-weight-light">KIN KHORN</span>
      </a>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 d-flex">
          <div className="image">
            {/* <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" /> */}
            <img
              src={userContext.user.picture}
              className="img-circle elevation-2"
              alt="pic"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block">
              {userContext.user.name}
            </a>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
            <li className="nav-item">
              <a href="/" className="nav-link">
                <i className="nav-icon fas fa-home" />
                <p>
                  Home
                  {/* <span className="right badge badge-danger">New</span> */}
                </p>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-list" />
                <p>
                  Activity
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="/" className="nav-link">
                    <i className="far fa-clipboard nav-icon" />
                    <p>My Activites</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="./index2.html" className="nav-link">
                    <i className="fas fa-utensils nav-icon" />
                    <p>Delivery</p>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link">
                <i className="nav-icon fas fa-wallet" />
                <p>
                  Payment
                  {/* <span className="right badge badge-danger">New</span> */}
                </p>
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link">
                <i className="nav-icon fas fa-comment-dots" />
                <p>
                  Messages
                  {/* <span className="right badge badge-danger">New</span> */}
                </p>
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link">
                <i className="nav-icon fas fa-user-circle" />
                <p>
                  Account
                  {/* <span className="right badge badge-danger">New</span> */}
                </p>
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link">
                <i className="nav-icon fas fa-sign-out-alt" />
                <p>
                  Sign out
                  {/* <span className="right badge badge-danger">New</span> */}
                </p>
              </a>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
    </aside>
  );
}
