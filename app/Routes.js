import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './App';
import Index from './pages/Index';
import Login from './pages/Login';

require('react-tap-event-plugin')();
require('normalize-css');

class Routes extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Index} />
          <Route path="login" component={Login} />
          <Route path="dorm" component={Login} />
          <Route path="profile" component={Login} />
        </Route>
      </Router>
    );
  }
}

export default Routes;


