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

const PrivateRoute = (props: RouteProps) => {
  const userContext = useContext(UserContext);
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
        console.log("res : ",res.data.user);
        userContext.setCurrentUser(res.data.user);
      })
      .catch((err) => console.error(err));
      console.log(userContext.isSignedIn);
  }, []);
 
  return (
    <div>
      <BasicLayout>
      <Switch>
        <PrivateRoute exact path='/' component={HomePage}/>
        <PrivateRoute exact path='/myactivity' component={MyActivitiesPage}/>
        <PrivateRoute path='/myaccount' component={AccountPage}/>
        <PrivateRoute path='/payment' component={PaymentPage}/>

        <Route path='/signout' component={SignOutPage}/>
        <Route path='/oauth/google'/>
        <Route path='/oauth/logout'/>
        {
          (userContext.isSignedIn)
            ? <Redirect from='/signin' to='/' />
            : <Route path='/signin' component={SignInPage} />
        }
        
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
