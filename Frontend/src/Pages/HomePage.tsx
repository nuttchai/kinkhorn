import React, { Component, useEffect, useState, useContext } from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import pic from '../img/img_avatar3.png';
import User from '../Types/User.d';
import { UserContext } from '../Context/UserContext';


function Home() {
    const [homePageInfo,setHomePageInfo] = useState('');
    const currentUser = useContext(UserContext).user;
    // const fetchData = () =>{
    //     return axios.get('https://randomuser.me/api')
    //     .then((res) => {
    //         // console.log("data : ",data.results);
    //         setHomePageInfo(JSON.stringify(res));
    //         userContext.setCurrentUser(res.data.results[0]);
    //         console.log("res",res.data.results[0]);
    //         console.log("current",userContext.user);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
    // }
    
    useEffect(() => {
        // fetchData();
        // console.log(userContext);
    },[]);
    return (
        <>
        <h1>
            Kin Khorn HomePage
        </h1>
        <div>
            {currentUser.name}
        </div>
        <img src={currentUser.picture} alt='pic'/>
        <p>
            {homePageInfo}
        </p>
        </>

    );

}

export default Home;
