import React from 'react';
import logo from './logo.svg';
import Home from './Pages/Home';
import { BrowserRouter, Route, Switch, RouteComponentProps} from 'react-router-dom';
import './App.css';
function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/oauth/login' />
      </Switch>
    </div>
  );
}

export default App;
