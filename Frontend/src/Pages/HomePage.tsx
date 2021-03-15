import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';



function Home() {

    return (
        <>
        <h1>
            Kin Khorn
        </h1>
        <Link to='/oauth/login'>Login</Link>
        </>

    );

}

export default Home;