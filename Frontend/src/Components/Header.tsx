import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/UserContext';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = ({cart} : any) => {
  const { isSignedIn } = useContext(UserContext);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    let count = 0;
    cart.forEach((item : any) => {
      count += item.qty;
    });

    setCartCount(count);
  }, [cart, cartCount]);

  let cartNum : JSX.Element = (<div></div>);
  if(cartCount > 0){
    cartNum = (<span className="badge badge-danger navbar-badge">{cartCount}</span>)
  }
  let curUser: JSX.Element = (
    <>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="/"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="/" className="nav-link">
              Home
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
        <li className="nav-item">
            <a
              className="nav-link"
              href="/signin"
              role="button"
            >
              <i className="fas fa-user" />
            </a>        
          </li>     
        </ul>
      </nav>
    </>
  );
  if (isSignedIn) {
    curUser = (
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="/"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
          <li className="nav-item d-sm-inline-block">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {/* Navbar Search */}
          {/* <li className="nav-item">
            <a
              className="nav-link"
              data-widget="navbar-search"
              href="/"
              role="button"
            >
              <i className="fas fa-search" />
            </a>
            <div className="navbar-search-block">
              <form className="form-inline">
                <div className="input-group input-group-sm">
                  <input
                    className="form-control form-control-navbar"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-navbar" type="submit">
                      <i className="fas fa-search" />
                    </button>
                    <button
                      className="btn btn-navbar"
                      type="button"
                      data-widget="navbar-search"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li> */}
          {/* Messages Dropdown Menu */}
          <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="far fa-bell" />
              <span className="badge badge-warning navbar-badge">2</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <a href="#" className="dropdown-item">
                <div className="media">
                  <img
                    src="dist/img/user1-128x128.jpg"
                    alt="User Avatar"
                    className="img-size-50 mr-3 img-circle"
                  />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      Kiosk Name
                      <span className="float-right text-sm text-danger">
                        <i className="fas fa-star" />
                      </span>
                    </h3>
                    <p className="text-sm">Your order is ready to grab</p>
                    <p className="text-sm text-muted">
                      <i className="far fa-clock mr-1" /> 4 minutes Ago
                    </p>
                  </div>
                </div>
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <div className="media">
                  <img
                    src="dist/img/user8-128x128.jpg"
                    alt="User Avatar"
                    className="img-size-50 img-circle mr-3"
                  />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      John Pierce
                      <span className="float-right text-sm text-muted">
                        <i className="fas fa-star" />
                      </span>
                    </h3>
                    <p className="text-sm">I got your message bro</p>
                    <p className="text-sm text-muted">
                      <i className="far fa-clock mr-1" /> 4 Hours Ago
                    </p>
                  </div>
                </div>
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item dropdown-footer">
                See All Notifications
              </a>
            </div>
          </li>
          <li className="nav-item">
            {/* <AddShoppingCartIcon /> */}
            {/* <i className="fas fa-shopping-basket"></i> */}
            <Link
              className="nav-link"
              to="/cart"
              role="button"
            >
              <i className="fas fa-shopping-basket"/>
              {cartNum}
            {/* <span className="badge badge-danger navbar-badge">{cartCount}</span> */}
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
  return <>{curUser}</>;
}

const mapStateToProps = (state : any) => {
  return {
    cart: state.shop.cart,
  };
};

export default connect(mapStateToProps)(Header);