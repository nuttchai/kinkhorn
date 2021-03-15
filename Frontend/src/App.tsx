import React from 'react';
import logo from './logo.svg';
import HomePage from './Pages/HomePage';
import { BrowserRouter, Route, Switch, RouteComponentProps} from 'react-router-dom';
import './App.css';
import SignInPage from './Pages/SignInPage';
import SignOutPage from './Pages/SignOutPage';
function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/SignIn' component={SignInPage}/>
        <Route path='/SignOut' component={SignOutPage}/> 
        <Route path='/oauth/login' />
      </Switch>
    </div>
  );
}

export default App;
