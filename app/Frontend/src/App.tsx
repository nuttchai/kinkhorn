import React, { useContext, useLayoutEffect } from 'react';
import HomePage from './Pages/HomePage';
import { Route, Switch, RouteProps, Redirect} from 'react-router-dom';
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
import Products from './Product/Products';
import ReduxCart from './ReduxCart/ReduxCart';
import SingleItem from './SingleItem/SingleItem';
import { connect } from 'react-redux';
import SingleKiosk from './Components/SingleKiosk/SingleKiosk';
import QueuePage from './Pages/QueuePage';
import CreateStorePage from './Pages/CreateStorePage';

const PrivateRoute = (props: RouteProps) => {
  const userContext = useContext(UserContext);
  console.log(userContext.isSignedIn);
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
    axios.get('/oauth/user/info')
      .then((res) => {
        userContext.setCurrentUser(res.data.user,res.data.money);
        // console.log('res.data :',res.data); 
      })
      .catch((err) => console.error(err));
  }, []);

  let route;
  if(userContext.isSignedIn){
    // console.log('in if');
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
    {/* {!current ? (
        <Redirect to="/" />
        ) : (
          <Route exact path='/canteen/kiosk/menu/:id' component={SingleItem} />
        )} */}
    {/* <Redirect from='/signin' to='/'/> */}

    </Switch>
    </>)
  }
  else{
    // console.log('in else');
    route = (<>
    <Switch>
      <Route exact path='/signin' component={SignInPage}/>
      <Route path = '/queue' component = {QueuePage}/>
      <Redirect to='/signin'/>
      {/* {!userContext.isSignedIn ? <Redirect to='/signin'/> : <div></div>} */}
    </Switch>
    </>)
  }
  // console.log(userContext.isSignedIn);
  return (
    <div>
      <BasicLayout>
      <Switch>
        {/* {route} */}
        <PrivateRoute exact path='/' component={HomePage}/>
        <PrivateRoute exact path='/canteen' component={CanteenPage}/>
        <PrivateRoute exact path='/myactivity' component={MyActivitiesPage}/>
        <PrivateRoute exact path='/myaccount' component={AccountPage}/>
        <PrivateRoute exact path='/payment' component={PaymentPage}/>
        <PrivateRoute exact path='/signout' component={SignOutPage}/>
        <PrivateRoute exact path='/canteen/kiosk' component={KioskPage}/>
        <PrivateRoute exact path='/oauth/logout'/>
        <PrivateRoute path = '/cart' component={ReduxCart}/>
        {/* <PrivateRoute exact path="/product" component={Products} />
        <PrivateRoute exact path="/product/:id" component={SingleItem} /> */}
        <PrivateRoute exact path='/canteen/kiosk/:id' component={SingleKiosk}/>
        <PrivateRoute exact path='/createStore' component={CreateStorePage}/>
        <PrivateRoute exact path='/signout' component={SignOutPage}/>
        <Route path = '/queue' component = {QueuePage}/>
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