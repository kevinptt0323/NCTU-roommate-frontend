import React, { PropTypes } from 'react';

import { Paper, RaisedButton } from 'material-ui';

import { FB as FBlogin, D2 as D2login } from '../components/Login'

class Login extends React.Component {
  constructor(props, context) {
    super(props);
  }
  componentWillMount() {
    const { store } = this.context;
    const state = store.getState();
    let { token } = state.auth;
    if (!!token) {
      this.context.postLogin();
    } else {
      const { pathname, query } = state.routing.locationBeforeTransitions;
      token = query.token
      if (token !== undefined) {
        this.context.setToken(token);
        this.context.postLogin();
      }
    }
  }
  render() {
    const { props } = this;
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Paper
          zDepth={1}
          style={{
            padding: 24,
            textAlign: 'center',
            display: 'inline-block'
          }}
        >
          <RaisedButton label="D2 登入" onTouchTap={D2login.bind(this)} /><br /><br />
          <RaisedButton label="Facebook 登入" onTouchTap={FBlogin.bind(this)} />
        </Paper>
      </div>
    );
  }
}

Login.contextTypes = {
  setToken: PropTypes.func.isRequired,
  postLogin: PropTypes.func.isRequired,
  server: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

export default Login;

