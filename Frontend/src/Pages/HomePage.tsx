import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const fetchData = () =>{
    axios.get('https://randomuser.me/api')
    .then(({data}) => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    });
}
function Home() {

    return (
        <>
        <h1>
            Kin Khorn
        </h1>
        
        </>

    );

}

export default Home;
