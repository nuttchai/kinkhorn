import React, { useContext, useLayoutEffect } from 'react';
import HomePage from './Pages/HomePage';
import { Route, Switch, RouteProps, Redirect} from 'react-router-dom';
import SignInPage from './Pages/SignInPage';
import SignOutPage from './Pages/SignOutPage';
import { UserContext } from './Context/UserContext';
// import axios from 'axios';
import BasicLayout from './Layouts/BasicLayout';
import MyActivitiesPage from './Pages/MyActivitiesPage';
import PaymentPage from './Pages/PaymentPage';
import AccountPage from './Pages/AccountPage';
import CanteenPage from './Pages/CanteenPage';
import KioskPage from './Pages/KioskPage';
// import Products from './Product/Products';
import ReduxCart from './ReduxCart/ReduxCart';
// import SingleItem from './SingleItem/SingleItem';
import { connect } from 'react-redux';
import SingleKiosk from './Components/SingleKiosk/SingleKiosk';
// import QueuePage from './Pages/QueuePage';
import CreateStorePage from './Pages/CreateStorePage';
import OrderingPage from './Pages/OrderingPage';
import HisotryPage from './Pages/HistoryPage';
import MyStorePage from './Pages/MyStorePage';
import SingleStorePage from './Pages/SingleStorePage';
import OrderHistoryPage from './Pages/OrderHistoryPage';
import * as apicall from './api/apicall'
import HomePageSeller from './Pages/HomePageSeller';
import SingleOrderPage from './Pages/SingleOrderPage';
import SingleItem from './SingleItem/SingleItem';

const PrivateRoute = (props: RouteProps) => {
  const userContext = useContext(UserContext);
  // console.log(userContext.isSignedIn);
  return <>
    {
      (userContext.isSignedIn)
        ? <Route {...props} />
        : <Redirect to="/signin" />
    }
  </>;
};

function App({current} : any) {

  const userContext = useContext(UserContext);

  useLayoutEffect(() => {
    apicall.getUserInfo()
      .then((res) => {
        userContext.setCurrentUser(res.data);
      })
      .catch((err) => console.error(err));

  }, []);

  let route = (<>
  </>)

  if (userContext.user.role === 'customer'){
    route = (<>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/canteen' component={CanteenPage}/>
        <Route exact path='/myactivity' component={MyActivitiesPage}/>
        <Route exact path='/myactivity/:id' component={HisotryPage}/>
        <Route exact path='/myaccount' component={AccountPage}/>
        <Route exact path='/payment' component={PaymentPage}/>
        <Route exact path='/canteen/kiosk' component={KioskPage}/>
        <Route path = '/cart' component={ReduxCart}/>
        <Route exact path='/canteen/kiosk/:id' component={SingleKiosk}/>
        <Route exact path='/signout' component={SignOutPage}/>
        <Route exact path='/ordering' component={OrderingPage}/>
        <Route exact path='/myactivity/order/:id' component={HisotryPage}/>
        <Route exact path = '/history' component = {HisotryPage}/>
        <Route exact path='/oauth/logout'/>
        {!current ? (
        <Redirect to="/" />
        ) : (
          <Route exact path='/canteen/kiosk/menu/:id' component={SingleItem} />
        )}
        {
              (userContext.isSignedIn)
                ? <Redirect from="/signin" to="/" />
                : <Route path='/signin' component={SignInPage} />
        }
    </>)
  }
  else if (userContext.user.role === 'seller'){
    // console.log('Seller')
    route = (<>
      <Route exact path='/oauth/logout'/>
      <Redirect from="/" to="/order" />
      <Route exact path = '/order' component = {HomePageSeller} />
      <Route exact path = '/order/:id' component = {SingleOrderPage} />
      <Route exact path = '/orderHistory' component = {OrderHistoryPage} />
      <Route exact path = '/mystore' component = {MyStorePage} />
      <Route exact path = '/mystore/:id' component = {SingleStorePage}/>
      <Route exact path='/createStore' component={CreateStorePage}/>
      <Route exact path='/signout' component={SignOutPage}/>
      {
              (userContext.isSignedIn)
                ? <Redirect from="/signin" to="/order" />
                : <Route path='/signin' component={SignInPage} />
      }
    </>)
  }
  else {
    // console.log('else')
    route = (<>
      <Redirect from="/" to="/signin" />
      <Route path='/signin' component={SignInPage} />
     </>)
  }
  // console.log('user id: ', userContext.user._id)
  return (
    <div>
      <BasicLayout>
      <Switch>
        {route}
        {/* FIXME : DELETE THIS PATH */}
        {/* <Route exact path='/' component={HomePage}/>
        <Route exact path='/canteen' component={CanteenPage}/>
        <Route exact path='/myactivity' component={MyActivitiesPage}/>
        <Route exact path='/myaccount' component={AccountPage}/>
        <Route exact path='/payment' component={PaymentPage}/>
        <Route exact path='/signout' component={SignOutPage}/>
        <Route exact path='/canteen/kiosk' component={KioskPage}/>
        // <Route exact path='/oauth/logout'/>
        <Route path = '/cart' component={ReduxCart}/>
        <Route exact path="/product/:id" component={SingleItem} />
        <Route exact path='/canteen/kiosk/:id' component={SingleKiosk}/>
        <Route exact path='/createStore' component={CreateStorePage}/>
        <Route exact path='/signout' component={SignOutPage}/>
        <Route exact path='/ordering' component={OrderingPage}/>
        <Route path = '/queue' component = {QueuePage}/>
        <Route exact path='/myactivity/order/:id' component={HisotryPage}/>
        <Route path = '/history' component = {HisotryPage}/>
        <Route exact path = '/mystore' component = {MyStorePage}/>
        <Route exact path = '/mystore/id' component = {SingleStorePage}/>
        FIXME : DELETE THIS PATH
        <Route path = '/queue' component = {QueuePage}/>
        {!current ? (
        <Redirect to="/" />
        ) : (
          <Route exact path='/canteen/kiosk/menu/:id' component={SingleItem} />
        )} */}

      </Switch>
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