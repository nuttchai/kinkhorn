import React, { Component, useEffect, useState, useContext } from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import pic from '../img/img_avatar3.png';
import User from '../Types/User.d';
import { UserContext } from '../Context/UserContext';


function Home() {
    const [homePageInfo,setHomePageInfo] = useState('');
    const userContext = useContext(UserContext);

    return (
        <>
        <h1>
            Kin Khorn HomePage
        </h1>
        <div>
            {userContext.user.name}
        </div>
        <img src={userContext.user.picture} alt='pic'/>
        <p>
            {homePageInfo}
        </p>
        </>

    );

}

export default Home;
