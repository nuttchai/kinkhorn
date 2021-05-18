import React, { useState, useEffect, useContext } from 'react';
import styles from './ReduxCart.module.css';

import { connect } from 'react-redux';

import CartItem from './CartItem/CartItem';
import { Card, Container, Button } from '@material-ui/core';
import Subtitle from '../Components/Subtitle';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as apicall from '../api/apicall';


const Cart = ({ cart, currentKiosk }: any) => {
  const userContext = useContext(UserContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [order , setOrder]  = useState<apicall.IPlaceOrderRequest>({
    shopId: "",
    userId : "",
    orderList : cart,
  })
  

  let orderButton = (<Button
    variant="contained"
    color="primary"
    style={{ width: '100%', marginTop : '16px' }}
  >
    Place Order
  </Button>);
  
  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.forEach((item: any) => {
      items += item.qty;
      price += item.qty * item.price;
    });

    setTotalItems(items);
    setTotalPrice(price);
  }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);



  const placeOrder = (order : apicall.IPlaceOrderRequest) => {


    // axios
    //   .post('http://13.229.160.22:9000/api/orders/customer', json)
    //   .then((res) => console.log('res placeorder : ', res))
    //   .catch((err) => console.log('err : ', err));

    apicall.placeOrder(order)
      .then((res) => console.log('res placeorder : ', res.data.Data))
      .catch((err) => console.log('err : ', err));
  };


  let currentKioskName = (<></>)
    
  if(totalItems){

    orderButton = (<>
    <Link to="/ordering">
    <Button
      variant="contained"
      color="primary"
      style={{ width: '100%' }}
      onClick={() => placeOrder(order)}
    >
      Place Order
    </Button>
    </Link>
    </>
    )

    
    currentKioskName = (<div>KioskName</div>)
  }

  
  return (
    <Container maxWidth="lg">
      <h2>My Cart</h2>
      <Card>
            {/* <div>back</div> */}
            <div>{currentKioskName}</div>
          </Card>
          <Subtitle>Order Summary</Subtitle>
          <Card>
            <div>
              {cart.map((item: any) => (
                <CartItem key={item._id} item={item} />
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
            <i className="fas fa-wallet" style={{ marginRight: '4px' }}></i>{' '}
            {userContext.user.money} Baht
          </Card>
            {orderButton}
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

const mapStateToProps = (state: any) => {
  return {
    cart: state.shop.cart,
    currentKiosk: state.shop.currentKiosk,
  };
};

export default connect(mapStateToProps)(Cart);
