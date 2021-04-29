import React, { useState, useEffect, useContext } from 'react';
import styles from './ReduxCart.module.css';

import { connect } from 'react-redux';

import CartItem from './CartItem/CartItem';
import { Card, Container, Button } from '@material-ui/core';
import Subtitle from '../Components/Subtitle';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cart = ({ cart, currentKiosk }: any) => {
  const userContext = useContext(UserContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  

  let json = {};
  let orderButton = (<Button
    variant="contained"
    color="primary"
    style={{ width: '100%', marginTop : '16px' }}
    disabled
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
  // console.log('cart : ', cart);

  if(cart.length != 0){
    json = { shopId : currentKiosk.id._id, userId : userContext.user.user_id , orderList : cart}

  }

  // console.log('json : ', json);
  const placeOrder = () => {
    axios
      .post('http://143.198.208.245:9000/api/orders/customer', json)
      .then((res) => console.log('res placeorder : ', res));
  };
  let currentKioskName = (<></>)

  if(totalItems){
    orderButton = (<>
    <Link to="/ordering">
    <Button
      variant="contained"
      color="primary"
      style={{ width: '100%' }}
      onClick={() => placeOrder()}
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
