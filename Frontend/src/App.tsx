import React, { useContext, useLayoutEffect } from 'react';
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
    // axios.get('/api/user/info')
    // axios.get('https://randomuser.me/api')
    //   .then((res) => {
    //     userContext.setCurrentUser(res.data.results[0]);
    //     console.log(res.data.results[0]);
    //     userContext.user.name = res.data.results[0].id.name;
    //     userContext.user.picture = res.data.results[0].picture.medium;
    //     console.log(userContext.user);
    //   })
    //   .catch((err) => console.error(err));
  }, []);
 
  return (
    <div className='App'>
      <Switch>
      <BasicLayout>
        <PrivateRoute exact path='/' component={HomePage}/>
        <Route path='/oauth/login' />
        <Route path='/signout' component={SignOutPage}/> 
        {
              (userContext.isSignedIn)
                ? <Redirect from="/signin" to="/" />
                : <Route path='/signin' component={SignInPage} />
        }
      </BasicLayout>
      </Switch>
    </div>
  );
}

export default App;
