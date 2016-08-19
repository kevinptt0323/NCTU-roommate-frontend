import React, { PropTypes } from 'react';
import { Paper, RaisedButton } from 'material-ui';

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
          <RaisedButton label="D2 登入" href={`${this.context.config.SERVER_HOST}/d2login/`} /><br /><br />
          <RaisedButton label="Facebook 登入" href={`${this.context.config.SERVER_HOST}/fblogin/`} />
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

