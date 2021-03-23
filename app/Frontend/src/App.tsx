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
  }, []);
 
  return (
    <div className='App'>

      <BasicLayout>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/auth/google'/>
        <Route path='/signout' component={SignOutPage}/>
        <Route path='/signin' component={SignInPage} />
        {/* {
          (userContext.isSignedIn)
            ? <Redirect from="/signin" to="/" />
            : <Route path='/signin' component={SignInPage} />
        } */}
      </Switch>
      </BasicLayout>
    </div>
  );
}

export default App;
