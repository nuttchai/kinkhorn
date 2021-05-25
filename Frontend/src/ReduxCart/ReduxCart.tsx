
import { loadOrderStatus, refreshCart } from '../Redux/Shopping/shopping-action';
import { useHistory } from 'react-router-dom';

import React, { useState, useEffect, useContext } from 'react';
import styles from './ReduxCart.module.css';

import { connect } from 'react-redux';
import { spacing } from '@material-ui/system';
import CartItem from './CartItem/CartItem';
import { Card, Container, Button } from '@material-ui/core';

import { UserContext } from '../Context/UserContext';
import { Link } from 'react-router-dom';
import * as apicall from '../api/apicall';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import ListIcon from '@material-ui/icons/List';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TodayIcon from '@material-ui/icons/Today';
import { deepPurple } from '@material-ui/core/colors';
import StoreIcon from '@material-ui/icons/Store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: 'hidden',
      padding: theme.spacing(0, 3),
    },
    paper: {
      maxWidth: 400,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
    },
    avatar: {
      margin: theme.spacing(0),
      backgroundColor: theme.palette.secondary.main,
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
  }),
);

const Cart = ({ cart, currentKiosk, loadOrderStatus,refreshCart }: any) => {
  let history = useHistory();
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(),
  );
  const [order , setOrder]  = useState<apicall.IPlaceOrderRequest>({
    userId: userContext.user._id,
    shopId : currentKiosk.id._id,
    shop : currentKiosk.id.shop,
    area : currentKiosk.id.area,
    orderList : cart,
    recieveTime : null,
  })
  
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setOrder({...order, recieveTime : date})
  }
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
    setOrder({...order, recieveTime : selectedDate})
    console.log('order json before placeorder', order)
    apicall.placeOrder(order)
      .then((res) => {
        console.log('res placeorder : ', res.data)
        loadOrderStatus(res.data)
        refreshCart();
        // console.log('refresh')
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

    currentKioskName = (
      <div>
        <ListItem>
        <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <StoreIcon />
            </Avatar>
            </ListItemAvatar>
            <ListItemText>
            <Box fontWeight="fontWeightBold">
            {currentKiosk.id.shop}
          </Box>
            
            </ListItemText>
            </ListItem>
            </div>)
  }

  // console.log('date : ', selectedDate);
  console.log('order json :', order)
  return (<>
     <Container maxWidth="lg">
      <h2>My Cart</h2>
      <Card >
            <div>{currentKioskName}</div>
          </Card>

          <Card style={{ marginTop: '16px' }}>
            <div>
            <ListItem>
          <ListItemAvatar>
          <Avatar color="blue">
            <ListIcon color="inherit"/>
          </Avatar>
          </ListItemAvatar>
          <ListItemText>
          <Box fontWeight="fontWeightLight">
            Order Summary
          </Box>
          </ListItemText>
          </ListItem>
          <Divider/>
          
          <ListItem>
          <ListItemText>
          {/* <Box textAlign="left"> */}
            Total Item: ({cart.length})
          {/* </Box> */}
          </ListItemText>
          </ListItem>
          <Divider/>
          
          
          <ListItem>
          <ListItemText>
          <Box mb = {0} textAlign="left"> 
            Order Details
           </Box>
          {/* <div>
              {cart.map((item: any) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div> */}
          </ListItemText>
          </ListItem>
          
          <div>
            {/* <Grid item xs={12}> */}
            <Box fontWeight="fontWeightLight" m={2} textAlign="justify">
              {cart.map((item: any) => (
                <CartItem key={item._id} item={item} />
              ))}
              </Box>
              {/* </Grid> */}
            </div>
            </div>
            </Card>
            
          <Card style={{ marginTop: '16px' }}>
          <Grid container direction="row" >
            <div>
              <ListItem>
            <ListItemAvatar>
          <Avatar color="blue" className={classes.purple}>
            <TodayIcon  color="inherit"/>
          </Avatar>
          </ListItemAvatar>
          
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {/* <Grid container direction="row" justify="flex-end"> */}
            <KeyboardDatePicker
               margin="normal"
               id="date-picker-dialog"
               label="Select Pick Up Date"
               format="MM/dd/yyyy"
               value={selectedDate}
               onChange={handleDateChange}
               KeyboardButtonProps={{
                 'aria-label': 'change date',
                }}
              />
              </MuiPickersUtilsProvider>
              </ListItem>
              </div>
              </Grid>
            
            <Divider/>
          
          <Grid container direction="row">
            
            <div>
              <ListItem>
            <ListItemAvatar>
          <Avatar color="blue" className={classes.purple}>
            <AccessTimeIcon color="inherit"/>
          </Avatar>
          </ListItemAvatar>
          
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {/* <Grid container direction="row" justify="flex-end"> */}
            <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Select Pick Up Time"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
              </MuiPickersUtilsProvider>
              </ListItem>
              </div>
            </Grid>
  
            </Card>
          <Card style={{ marginTop: '16px' }}>  
          
            <ListItem>
          <ListItemText>
          {/* <Box textAlign="left"> */}
            Total <div>
                <Box fontWeight="fontWeightLight">
                {totalPrice} Baht
                </Box>
              </div>
          {/* </Box> */}
          </ListItemText>
          </ListItem>
          </Card>
            {/* </div> */}
          
          
          <Card style={{ marginTop: '16px' }}>
          <ListItemText>
            <Box m={1}>
            Your Wallet 
            </Box>
            <Box m={1}fontWeight="fontWeightLight"><i className="fas fa-wallet" style={{ marginRight: '4px' }}></i>{' '}
            {userContext.user.money} Baht</Box>
            </ListItemText>
          
            {/* OnClick = topup */}
            {/* <i className="fas fa-wallet" style={{ marginRight: '4px' }}></i>{' '}
            {userContext.user.money} Baht */}
          </Card>
            {orderButton}
    </Container>
  </>
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
    refreshCart : () => dispatch(refreshCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
