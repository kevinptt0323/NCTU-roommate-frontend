import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

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
          <div style={{ width: '70%', minWidth: '300px', margin: '20px auto' }}>
            <img style={{ width: '100%' }} src="https://roommate.twmicrosheep.com/static/2pig_bg.png" alt="交大新生找小豬系統" />
          </div>
          <RaisedButton label="登入 / Login" secondary={true} href={`${this.context.config.SERVER_HOST}/d2login/`} />
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
