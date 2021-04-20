import React, { Component, useEffect, useState, useContext } from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import pic from '../img/img_avatar3.png';
import User from '../Types/User.d';
import { UserContext } from '../Context/UserContext';
import Header from '../Components/Header';
import Menu from '../Components/Menu';
import Content from '../Components/Content';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar/Navbar';
import Button from '../Components/Button';
import { connect } from 'react-redux';

export type Props = {
    children?: React.ReactNode;
    cart : any
}
function BasicLayout({children,cart} : Props): JSX.Element {
    let isCart;
    if( cart.length === 0){
        isCart = (<div></div>);
    }
    else{
        isCart = ( <Button
            border="none"
            color="pink"
            height = "60px"
            onClick={() => console.log("You clicked on the pink circle!")}
            radius = "50%"
            width = "60px"/>);
    }
    // console.log('cart.length : ',cart.length);
    return (
        <>
        <Header/>
        <Menu/>
        <Navbar/>
        {children}
        {isCart}
        {/* <Content/> */}
        {/* <Footer/> */}
        </> 

    );

}

const mapStateToProps = (state : any) => {
    return {
      cart: state.shop.cart,
    };
  };


export default connect(mapStateToProps)(BasicLayout);
