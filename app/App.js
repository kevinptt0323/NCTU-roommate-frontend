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
  }
  getChildContext() {
    const { props: { token }, login, loadProfile, postLogin } = this;
    return {
      token,
      login,
      postLogin,
      config,
      loadProfile,
      setToken: this.props.setToken,
      profile: this.props.profile,
      server: prefix(config.SERVER_HOST),
    };
  }
  onLeftIconButtonTouchTap() {
    this.refs.leftNav.handleToggle();
  }
  login() {
    const { store } = this.context;
    store.dispatch(actions.setHistoryPath(this.props.prevLocation));
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
  postLogin() {
    const { store } = this.context;
    this.loadProfile();
    if (this.props.prevLocation.pathname == "/login") {
      store.dispatch(push('/'));
    } else {
      store.dispatch(push(this.props.prevLocation));
    }
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
          <div
            style={{
              position: 'absolute',
              height: 'calc(100% - 64px)',
              width: '100%',
              top: '64px'
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
  profile: PropTypes.object
};

const mapStateToProps = state => ({
  token: state.auth.token,
  profile: state.profile,
  prevLocation: state.routing.locationBeforeTransitions
});

const mapDispatchToProps = dispatch => ({
  setToken: token => {
    dispatch(actions.setToken(token));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
