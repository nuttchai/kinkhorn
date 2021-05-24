import React, { useState, useEffect, useContext } from 'react';

import { connect } from 'react-redux';

import CartItem from './CartItem/CartItem';
import { Card, Container, Button } from '@material-ui/core';
import Subtitle from '../Components/Subtitle';
import { UserContext } from '../Context/UserContext';
import { Link } from 'react-router-dom';
import * as apicall from '../api/apicall';
import { loadOrderStatus } from '../Redux/Shopping/shopping-action';
import { useHistory } from 'react-router-dom';

const Cart = ({ cart, currentKiosk, loadOrderStatus }: any) => {
  let history = useHistory();
  const userContext = useContext(UserContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  // const [order , setOrder]  = useState<apicall.IPlaceOrderRequest>({
  //   shopId: "",
  //   userId : "",
  //   orderList : cart,
  // })

  const [order , setOrder]  = useState<apicall.IPlaceOrderRequest>({
    userId: userContext.user._id,
    shopId : currentKiosk.id._id,
    orderList : cart,
  })
  

  let orderButton = (<Button
    variant="contained"
    color="primary"
    disabled
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

    apicall.placeOrder(order)
      .then((res) => {
        console.log('res placeorder : ', res.data)
        loadOrderStatus(res.data)
        history.push('/ordering')
      })
      .catch((err) => console.log('err : ', err));
    // loadOrderStatus
  };


  let currentKioskName = (<></>)
    
  if(totalItems > 0){
    // console.log('in if')
    // setOrder({...order ,shopId : currentKiosk.id._id,userId :userContext.user._id })
    orderButton = (<>
    {/* <Link to="/ordering"> */}
    <Button
      variant="contained"
      color="primary"
      style={{ width: '100%' }}
      onClick={() => placeOrder(order)}
    >
      Place Order
    </Button>
    {/* </Link> */}
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
    </Container>
  );
};

const mapStateToProps = (state: any) => {
  return {
    cart: state.shop.cart,
    currentKiosk: state.shop.currentKiosk,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadOrderStatus : (order : any) => dispatch(loadOrderStatus(order)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
