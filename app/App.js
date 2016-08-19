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
import config from './config';

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
  }
  getChildContext() {
    const { props: { token }, login, postLogin } = this;
    return {
      token,
      login,
      postLogin,
      config,
      setToken: this.props.setToken,
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
  postLogin() {
    const { store } = this.context;
    if (this.props.prevLocation.pathname == "/login") {
      store.dispatch(push('/'));
    } else {
      store.dispatch(push(this.props.prevLocation));
    }
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={{width: '100vw', height: '100vh'}}>
          <AppBar
            onLeftIconButtonTouchTap={this.onLeftIconButtonTouchTap}
            style={{ position: 'fixed', top: 0 }}
            title="Hello, world!"
          />
          <LeftNav ref="leftNav" />
          <div
            style={{
              position: 'relative',
              height: 'calc(100% - 64px)',
              top: '64px'
            }}
          >
            {
              React.cloneElement(
                this.props.children,
              )
            }
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
  postLogin: PropTypes.func.isRequired,
  config: PropTypes.object,
  token: PropTypes.string,
  server: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  token: state.auth.token,
  prevLocation: state.routing.locationBeforeTransitions
});

const mapDispatchToProps = dispatch => ({
  setToken: token => {
    dispatch(actions.setToken(token));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
