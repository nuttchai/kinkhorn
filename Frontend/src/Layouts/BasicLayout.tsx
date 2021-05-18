import React, { Component, useEffect, useState, useContext } from 'react';
import { Route, Link } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import Header from '../Components/Header';
import Menu from '../Components/Menu';
import Navbar from '../Components/Navbar/Navbar';
import Button from '../Components/Button';
import { connect } from 'react-redux';

export type Props = {
    children?: React.ReactNode;
    cart : any
}
function BasicLayout({children,cart} : Props): JSX.Element {
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
            width = "60px"
            cartnum = {cartNum}/>);
    }
    // console.log('cart.length : ',cart.length);
    return (
        <>
        <Header/>
        <Menu/>
        <Navbar/>
        {children}
        {/* {isCart} */}
        </> 

    );

}

const mapStateToProps = (state : any) => {
    return {
      cart: state.shop.cart,
    };
  };


export default connect(mapStateToProps)(BasicLayout);
