import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import Login from './containers/Login/Login'
import Home from './containers/Home/Home';

class App extends Component {

  render() {
    let routes = (
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/home/:id?' exact component={Home} />
        <Redirect to='/login' />
      </Switch>
    );
    return (
      <div className='App'>
        {routes}
      </div>
    );
  }
}

export default App;

