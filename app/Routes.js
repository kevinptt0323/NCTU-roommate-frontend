import React from 'react';
import { Router, Route, hashHistory, IndexRoute, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { useScroll } from 'react-router-scroll';

import App from './App';
import Index from './pages/Index';
import Login from './pages/Login';
import Dorm from './pages/Dorm';
import Profile from './pages/Profile';
import { EditButton } from './components/Profile';

require('react-tap-event-plugin')();
require('normalize-css');


const Routes = (props, context) => {
  const { store } = context;
  const historyStore = syncHistoryWithStore(hashHistory, store);
  const auth = {
    loginRequired: (nextState, replace) => {
      if (!store.getState().auth.token) {
        replace('/login');
      }
    }
  };
  return (
    <Router history={historyStore} render={applyRouterMiddleware(useScroll())}>
      <Route path="/" component={App}>
        <IndexRoute component={Index} onEnter={auth.loginRequired} />
        <Route path="login" component={Login} />
        <Route path="search" component={Dorm} onEnter={auth.loginRequired} />
        <Route path="user">
          <Route path="info/:uid" component={Profile.View} onEnter={auth.loginRequired} />
          <Route path="myinfo" onEnter={auth.loginRequired}>
            <IndexRoute components={{
              children: props => <Profile.View myinfo={true} {...props} />,
              appbarElementRight: EditButton,
            }} />
            <Route path="modify" component={Profile.Edit} />
          </Route>
        </Route>
      </Route>
    </Router>
  );
};

Routes.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default Routes;


