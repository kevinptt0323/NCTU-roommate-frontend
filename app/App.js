/* libraries */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import prefix from 'superagent-prefix';

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
    this.onLogin = this.onLogin.bind(this);
  }
  getChildContext() {
    const { props: { token }, login, onLogin } = this;
    return {
      token,
      login,
      onLogin,
      config,
      setToken: this.props.setToken,
      server: prefix(config.SERVER_HOST),
    };
  }
  onLeftIconButtonTouchTap() {
    this.refs.leftNav.handleToggle();
  }
  login() {
    const { pathname, query } = this.props.location;
    this.setState({ beforeLogin: { pathname, query }});
    this.context.router.push('/login');
  }
  onLogin() {
    const { beforeLogin: state = "/" } = this.state;
    this.context.router.push(state);
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={{width: '100vw', height: '100vh'}}>
          <AppBar
            onLeftIconButtonTouchTap={this.onLeftIconButtonTouchTap}
            style={{ position: 'fixed' }}
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
  router: PropTypes.object.isRequired
};

App.childContextTypes = {
  setToken: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  config: PropTypes.object,
  token: PropTypes.string,
  server: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  setToken: token => {
    dispatch(actions.setToken(token));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
