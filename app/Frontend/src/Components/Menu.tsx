import React, { useContext } from 'react'
import styled from 'styled-components';
import { UserContext } from '../Context/UserContext';


export default function Menu() {
    const userContext = useContext(UserContext);
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <a href="index3.html" className="brand-link">
                <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                <span className="brand-text font-weight-light">KIN KHORN</span>
            </a>
            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar user panel (optional) */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex" style = {{display : 'flex',flexFlow : 'row'}}>
                    <div className="image">
                        {/* <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" /> */}
                        <img src={userContext.user.picture} className="img-circle elevation-2" alt='pic'/>
                    </div>
                    <div className="info">
                        <a href="#" className="d-block"> {userContext.user.name}</a>
                    </div>
                </div>
                {/* SidebarSearch Form */}

            </div>
            {/* /.sidebar */}
        </aside>

    )
}
