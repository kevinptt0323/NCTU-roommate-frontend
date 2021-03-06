import React from 'react';
import { Router, Route, hashHistory, IndexRedirect, IndexRoute, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { useScroll } from 'react-router-scroll';

import App from './App';
import Login from './pages/Login';
import Search from './pages/Search';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import { EditButton } from './components/Profile';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-65410860-4');
function fireTracking() {
    ReactGA.pageview(window.location.hash.split('?')[0]);
}

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
    <Router onUpdate={fireTracking} history={historyStore} render={applyRouterMiddleware(useScroll())}>
      <Route path="/" component={App}>
        <IndexRedirect to="/search" />
        <Route path="login" component={Login} />
        <Route path="privacy" component={Privacy} />
        <Route path="contact" component={Contact} />
        <Route path="search" component={Search} onEnter={auth.loginRequired} />
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
