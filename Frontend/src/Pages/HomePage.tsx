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
        axios.get('https://randomuser.me/api')
        .then((res) => {
            userContext.setCurrentUser(res.data.results[0]);
            console.log(res.data.results[0]);
            userContext.user.name = res.data.results[0].id.name;
            userContext.user.picture = res.data.results[0].picture.medium;
            console.log(userContext.user);
        })
        .catch((err) => console.error(err));
    },[]);
    return (
        <>
        <h1>
            Kin Khorn HomePage
        </h1>
        <div>
            dear {userContext.user.name}
        </div>
        <img src={userContext.user.picture} alt='pic'/>
        <p>
            {homePageInfo}
        </p>
        </>

    );

}

export default Home;
