import React, { useContext, useEffect, useLayoutEffect } from 'react';
import logo from './logo.svg';
import HomePage from './Pages/HomePage';
import { BrowserRouter, Route, Switch, RouteComponentProps, RouteProps, Redirect} from 'react-router-dom';
import './App.css';
import SignInPage from './Pages/SignInPage';
import SignOutPage from './Pages/SignOutPage';
import { UserContext } from './Context/UserContext';
import axios from 'axios';
import BasicLayout from './Layouts/BasicLayout';
import MyActivitiesPage from './Pages/MyActivitiesPage';
import PaymentPage from './Pages/PaymentPage';
import AccountPage from './Pages/AccountPage';
import CanteenPage from './Pages/CanteenPage';
import KioskPage from './Pages/KioskPage';
import CartPage from './Pages/CartPage';
import Products from './Product/Products';
import ReduxCart from './ReduxCart/ReduxCart';
import SingleItem from './SingleItem/SingleItem';
import { connect } from 'react-redux';
import SingleKiosk from './Components/SingleKiosk/SingleKiosk';
import QueuePage from './Pages/QueuePage';

function App({current} : any) {

  const userContext = useContext(UserContext);

  useLayoutEffect(() => {
    axios.get('/oauth/user/info')
      .then((res) => {
        userContext.setCurrentUser(res.data.user,res.data.money);
        console.log('res.data :',res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  

  let route;
  if(userContext.isSignedIn){
    console.log('in if');
    route = (<>
    <Switch>
    <Route exact path='/' component={HomePage}/>
    <Route exact path='/canteen' component={CanteenPage}/>
    <Route exact path='/myactivity' component={MyActivitiesPage}/>
    <Route exact path='/myaccount' component={AccountPage}/>
    <Route exact path='/payment' component={PaymentPage}/>
    <Route exact path='/signout' component={SignOutPage}/>
    <Route exact path='/canteen/kiosk' component={KioskPage}/>
    <Route exact path='/oauth/logout'/>
    <Route path = '/cart' component={ReduxCart}/>
    <Route exact path="/product" component={Products} />
    <Route exact path="/product/:id" component={SingleItem} />
    <Route exact path='/canteen/kiosk/:id' component={SingleKiosk}/>
    <Route path = '/queue' component = {QueuePage}/>
    {!current ? (
        <Redirect to="/" />
        ) : (
          <Route exact path='/canteen/kiosk/menu/:id' component={SingleItem} />
        )}
    </Switch>
    </>)
  }
  else{
    console.log('in else');
    route = (<>
    <Switch>
      <Route exact path='/signin' component={SignInPage}/>
      <Route path = '/queue' component = {QueuePage}/>
      {/* FIXME : THIS PATH IS TO TEST PLZ REMOVE ME */}
      {/* <Route exact path='/' component={HomePage}/>
      <Route exact path='/canteen' component={CanteenPage}/>
      <Route exact path='/myactivity' component={MyActivitiesPage}/>
      <Route exact path='/myaccount' component={AccountPage}/>
      <Route exact path='/payment' component={PaymentPage}/>
      <Route exact path='/signout' component={SignOutPage}/>
      <Route exact path='/canteen/kiosk' component={KioskPage}/>
      <Route exact path='/oauth/logout'/>
      <Route path = '/cart' component={ReduxCart}/>
      <Route exact path="/product" component={Products} /> */}
      {/* <Route exact path="/product/:id" component={SingleItem} /> */}
      {/* <Route exact path='/canteen/kiosk/:id' component={SingleKiosk}/>
      <Route exact path='/canteen/kiosk/menu/:id' component={SingleItem}/> */}
      {/* {!current ? (
        <Redirect to="/product" />
        ) : (
          <Route exact path="/product/:id" component={SingleItem} />
        )} */}
      {/* {!current ? (
        <Redirect to="/" />
        ) : (
          <Rou te exact path='/canteen/kiosk/menu/:id' component={SingleItem} />
        )} */}
        {/* <Redirect to='/signin'/> */}
    </Switch>
    </>)
  }
  return (
    <div>
      <BasicLayout>
      {/* <Switch> */}
        {route}
      {/* </Switch> */}
      </BasicLayout>
    </div>
  );
}

const mapStateToProps = (state : any) => {
  return {
    current: state.shop.currentItem,
  };
};
export default connect(mapStateToProps)(App);

// export default function App() {
//   return (
//     <div>
//       <BasicLayout/>
//     </div>
//   )
// }
