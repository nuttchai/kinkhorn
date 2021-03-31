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

const PrivateRoute = (props: RouteProps) => {
  const userContext = useContext(UserContext);
  // console.log("In private : ",userContext.isSignedIn);
  // if(userContext.isSignedIn){
  //   console.log("if");
  //   return <Route {...props}/>
  // } 
  // else{
  //   console.log("else na ja");
  //   return <Redirect to="/signin" />
  // }
  return <>
    {
      (userContext.isSignedIn)
        ? <Route {...props} />
        : <Redirect to="/signin" />
    } 
  </>;
};

function App() {

  const userContext = useContext(UserContext);

  useLayoutEffect(() => {
    axios.get('/oauth/user/info')
      .then((res) => {
        userContext.setCurrentUser(res.data.user);
      })
      .catch((err) => console.error(err));
  }, []);

  let route;
  if(userContext.isSignedIn){
    console.log('in if');
    route = (<>
    <Route exact path='/' component={HomePage}/>
    <Route exact path='/canteenA' component={CanteenPage}/>
    <Route exact path='/myactivity' component={MyActivitiesPage}/>
    <Route exact path='/myaccount' component={AccountPage}/>
    <Route exact path='/payment' component={PaymentPage}/>
    <Route exact path='/signout' component={SignOutPage}/>
    <Route exact path='/oauth/logout'/>
    </>)
  }
  else{
    console.log('in else');
    route = (<>
    {/* <Redirect to='/signin'/> */}
    <Route exact path='/signin' component={SignInPage}/>
    </>)
  }
  return (
    <div>
      <BasicLayout>
      <Switch>
        {route}
      </Switch>
      </BasicLayout>
    </div>
  );
}

export default App;

// export default function App() {
//   return (
//     <div>
//       <BasicLayout/>
//     </div>
//   )
// }
