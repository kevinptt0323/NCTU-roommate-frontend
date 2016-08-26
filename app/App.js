/* libraries */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import prefix from 'superagent-prefix';
import { push } from 'react-router-redux';

/* material-ui */
import { AppBar } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { indigo500 } from 'material-ui/styles/colors';

/* custom components */
import LeftNav from './components/LeftNav';
import BottomNav from './components/BottomNav';
import * as config from './config';

import { sendAjax } from './actions/api';
import * as actions from './actions';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo500,
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onLeftIconButtonTouchTap = this.onLeftIconButtonTouchTap.bind(this);
    this.login = this.login.bind(this);
    this.postLogin = this.postLogin.bind(this);
    this.loadProfile = this.loadProfile.bind(this);
    this.loadClasses = this.loadClasses.bind(this);
    this.loadBuildings = this.loadBuildings.bind(this);
  }
  getChildContext() {
    const { props: { token }, login, loadProfile, postLogin } = this;
    return {
      token,
      login,
      postLogin,
      config,
      loadProfile,
      location: this.props.location,
      setToken: this.props.setToken,
      profile: this.props.profile,
      classes: this.props.classes,
      buildings: this.props.buildings,
      search: this.props.search,
      server: prefix(config.SERVER_HOST),
    };
  }
  onLeftIconButtonTouchTap() {
    this.refs.leftNav.handleToggle();
  }
  login() {
    const { store } = this.context;
    store.dispatch(push('/login'));
  }
  loadProfile() {
    const { store } = this.context;
    store.dispatch(sendAjax({
      method: 'get',
      path: '/user/myinfo/',
      withToken: true,
      sendingType: 'GET_PROFILE',
    })).then(({body}) => {
      store.dispatch({
        type: 'GET_PROFILE_DONE',
        response: body
      });
    }).catch(error => {
      store.dispatch({
        type: 'GET_PROFILE_ERROR',
        response: error
      });
    });
  }
  loadClasses() {
    const { store } = this.context;
    store.dispatch(sendAjax({
      method: 'get',
      path: '/class/list/',
      withToken: true,
      sendingType: 'GET_CLASSES'
    })).then(({body}) => {
      store.dispatch({
        type: 'GET_CLASSES_DONE',
        response: body
      });
    }).catch(error => {
    });
  }
  loadBuildings() {
    const { store } = this.context;
    store.dispatch(sendAjax({
      method: 'get',
      path: '/building/list/floor/',
      withToken: true,
      sendingType: 'GET_BUILDINGS'
    })).then(({body}) => {
      store.dispatch({
        type: 'GET_BUILDINGS_DONE',
        response: body
      });
    }).catch(error => {
    });
  }
  postLogin() {
    const { store } = this.context;
    this.loadProfile();
    this.loadClasses();
    this.loadBuildings();
    store.dispatch(push('/'));
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={{width: '100vw', height: '100vh', position: 'absolute'}}>
          <AppBar
            onLeftIconButtonTouchTap={this.onLeftIconButtonTouchTap}
            style={{ position: 'fixed', top: 0 }}
            title="Hello, world!"
            iconElementRight={this.props.appbarElementRight}
          />
          <LeftNav ref="leftNav" />
          <BottomNav />
          <div
            style={{
              position: 'absolute',
              top: 64,
              height: 'calc(100% - 64px - 56px)',
              width: '100%',
              overflow: 'auto'
            }}
          >
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

App.childContextTypes = {
  setToken: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  loadProfile: PropTypes.func.isRequired,
  postLogin: PropTypes.func.isRequired,
  config: PropTypes.object,
  token: PropTypes.string,
  server: PropTypes.func.isRequired,
  profile: PropTypes.object,
  classes: PropTypes.object,
  buildings: PropTypes.object,
  search: PropTypes.object,
  location: PropTypes.object
};

const mapStateToProps = (state, props) => ({
  token: state.auth.token,
  profile: state.profile,
  classes: state.classes,
  buildings: state.buildings,
  search: state.search,
  location: props.location
});

const mapDispatchToProps = dispatch => ({
  setToken: token => {
    dispatch(actions.setToken(token));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
