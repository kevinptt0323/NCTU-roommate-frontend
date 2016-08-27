import React, { PropTypes } from 'react';
import { Paper, RaisedButton } from 'material-ui';

class Login extends React.Component {
  constructor(props, context) {
    super(props);
  }
  componentWillMount() {
    const { store } = this.context;
    const state = store.getState();

    const { pathname, query } = state.routing.locationBeforeTransitions;
    let token = query.token
    if (token !== undefined) {
      this.context.setToken(token);
      this.context.postLogin();
    } else if (!!state.token) {
      this.context.postLogin();
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
          alignItems: 'center',
          backgroundImage: 'url(https://roommate.twmicrosheep.com/static/landing_background.png)',
          backgroundSize: 'cover'
        }}
      >
        <div
          style={{
            padding: 24,
            textAlign: 'center',
            display: 'inline-block'
          }}
        >
          <h1 style={{ fontSize: '4em' }}>交大新生</h1>
          <h1 style={{ fontSize: '4em' }}>找小豬系統</h1>
          <RaisedButton label="D2 登入" secondary={true} href={`${this.context.config.SERVER_HOST}/d2login/`} />
        </div>
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
