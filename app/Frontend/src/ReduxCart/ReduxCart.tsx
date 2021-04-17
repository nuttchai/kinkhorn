import React, { useState, useEffect, useContext } from "react";
import styles from "./ReduxCart.module.css";

import { connect } from "react-redux";

import CartItem from "./CartItem/CartItem";
import { Card, Container,Button } from "@material-ui/core";
import Subtitle from "../Components/Subtitle";
import {UserContext} from "../Context/UserContext";
import axios from "axios";

const Cart = ({ cart, currentKiosk } : any) => {
  const userContext = useContext(UserContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.forEach((item : any) => {
      items += item.qty;
      price += item.qty * item.price;
    });

    setTotalItems(items);
    setTotalPrice(price);
  }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);

  const json = { shopId : currentKiosk.id._id, userId : '---userId---' , orderList : cart}

  console.log('json : ', json);
  const placeOrder = () => {
    axios.post('http://143.198.208.245:9000/api/orders/customer',json)
      .then( res => console.log('res placeorder : ', res))
  };

  return (
    <Container maxWidth="lg">
      <Card>
        <div>
          back
        </div>
        <div>
          Current Kiosks Name
        </div>
      </Card>
        <Subtitle>Order Summary</Subtitle>
      <Card>
        <div>
        {cart.map((item : any) => (
            <CartItem key={item._id} item={item} />
            // console.log('item in cart : ',item)
          ))}
        </div>
        ------
        <div>
          Total : ({totalItems} items)
          <div>{totalPrice} Baht</div>
        </div>
      </Card>
      <Subtitle>Payment Details</Subtitle>
      <Card>
      {/* OnClick = topup */}
      <i className="fas fa-wallet" style ={{marginRight : '4px'}}></i>   {userContext.user.money} Baht
      </Card>
      <Button variant="contained" color="primary" style ={{width: '100%'}} onClick = { () => placeOrder()} >Place Order</Button>
      {/* <div className={styles.cart}>
        <div className={styles.cart__items}>
          {cart.map((item : any) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className={styles.cart__summary}>
          <h4 className={styles.summary__title}>Cart Summary</h4>
          <div className={styles.summary__price}>
            <span>TOTAL: ({totalItems} items)</span>
            <span>$ {totalPrice}</span>
          </div>
          <button className={styles.summary__checkoutBtn}>
            Proceed To Checkout
          </button>
        </div>
      </div> */}
    </Container>
  );
};

const mapStateToProps = (state : any) => {
  return {
    cart: state.shop.cart,
    currentKiosk: state.shop.currentKiosk,
  };
};

export default connect(mapStateToProps)(Cart);
