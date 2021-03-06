import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import styled from 'styled-components';
import { UserContext } from '../Context/UserContext';
// import { connect } from "react-redux";
import * as apicall from '../api/apicall'

export default function Menu() {
  const userContext = useContext(UserContext);
  const { isSignedIn } = useContext(UserContext);
  const userName = userContext.user.name.split(' ');
  // console.log('split : ',userName);
  const usersplit = (
    <>
      {userName.map((name): any => {
        return <div style={{ margin: '0px 12px' }}>{name}</div>;
      })}
    </>
  );

  // useEffect(() => {
  //   apicall.getUserInfo()
  //     .then((res) => {

  //       userContext.setCurrentUser(res.data);
  //     })
  //     .catch((err) => console.error(err));

  // }, []);

  let curUser: JSX.Element = (
    <aside
      className="main-sidebar sidebar-dark-primary elevation-4"
      style={{ zIndex: 2 }}
    >
      {/* Brand Logo */}
      <Link to="/" className="brand-link">
        <img
          src="dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: '.8' }}
        />
        <span className="brand-text font-weight-light">KIN KHORN</span>
      </Link>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
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
              <a href="/signin" className="nav-link">
                <i className="nav-icon fas fa-sign-in-alt" />
                <p>
                  Sign In
                </p>
              </a>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
    </aside>
  );
  // console.log(userContext.user.roles);
  if (isSignedIn && userContext.user.role === 'seller') {
    // if(true){
    curUser = (
      <aside
        className="main-sidebar sidebar-dark-primary elevation-4"
        style={{ zIndex: 2 }}
      >
        {/* Brand Logo */}
        <Link to="/" className="brand-link">
          <img
            src="dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: '.8' }}
          />
          <span className="brand-text font-weight-light">KIN KHORN</span>
        </Link>
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
            <div>
              {/* <Link to="/myaccount" style={{ marginLeft: '0px' }}> */}
                {usersplit}
              {/* </Link> */}
              <Link to="/" className="d-block" style={{ margin: '4px 12px' }}>
                <i className="fas fa-wallet" style={{ marginRight: '4px' }}></i>{' '}
                {userContext.user.money} Baht
              </Link>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2" >
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <Link to="/order" className="nav-link" data-widget="pushmenu">
                  <i className="nav-icon fas fa-home" />
                  <p>
                    Order
                  </p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/mystore" className="nav-link" data-widget="pushmenu">
                  <i className="nav-icon fas fa-store" />
                  <p>
                    My Store
                  </p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/orderHistory" className="nav-link" data-widget="pushmenu">
                  <i className="nav-icon fas fa-clipboard-list" />
                  <p>Order history</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/createStore" className="nav-link" data-widget="pushmenu">
                  {/* <i className="nav-icon fas fa-user-circle" /> */}
                  <i className="nav-icon fas fa-plus-circle" />
                  <p>
                    Create Store
                  </p>
                </Link>
              </li>

              <li className="nav-item">
                <a href="/oauth/logout" className="nav-link">
                  <i className="nav-icon fas fa-sign-out-alt" />
                  <p>Sign out</p>
                </a>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
      </aside>
    );
  } else if (isSignedIn && userContext.user.role === 'customer') {
    curUser = (
      <aside
        className="main-sidebar sidebar-dark-primary elevation-4"
        style={{ zIndex: 2 }}
      >
        {/* Brand Logo */}
        <Link to="/" className="brand-link">
          <img
            src="dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: '.8' }}
          />
          <span className="brand-text font-weight-light">KIN KHORN</span>
        </Link>
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
            <div>
              <Link to="/myaccount" style={{ marginLeft: '0px' }}>
                {usersplit}
              </Link>
              <Link to="/" className="d-block" style={{ margin: '4px 12px' }}>
                <i className="fas fa-wallet" style={{ marginRight: '4px' }}></i>{' '}
                {userContext.user.money} Baht
              </Link>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2" >
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
       with font-awesome or any other icon font library */}
              <li className="nav-item" data-widget="pushmenu">
                <Link to="/" className="nav-link">
                  <i className="nav-icon fas fa-home" />
                  <p>
                    Home
                  </p>
                </Link>
              </li>
              <li className="nav-item" data-widget="pushmenu">
                <Link to="/myactivity" className="nav-link">
                  <i className="nav-icon fas fa-clipboard-list" />
                  <p>My Activites</p>
                </Link>
              </li>
              <li className="nav-item" data-widget="pushmenu">
                <Link to="/payment" className="nav-link">
                  <i className="nav-icon fas fa-wallet" />
                  <p>
                    Payment
                  </p>
                </Link>
              </li>
              
              {/* <li className="nav-item" data-widget="pushmenu">
                <Link to="/myaccount" className="nav-link">
                  <i className="nav-icon fas fa-user-circle" />
                  <p>
                    Account
                  </p>
                </Link>
              </li> */}

              <li className="nav-item">
                {/* <a href="/oauth/logout" className="nav-link"> */}
                <a href="https://kinkhorn.pongpich.xyz/oauth/logout" className="nav-link">
                  <i className="nav-icon fas fa-sign-out-alt" />
                  <p>
                    Sign out
                  </p>
                  </a>
                {/* </a> */}
              </li>

            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
      </aside>
    );
  }
  return <>{curUser}</>;
}
