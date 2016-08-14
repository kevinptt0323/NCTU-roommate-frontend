import React, { PropTypes } from 'react';
import { Paper, RaisedButton } from 'material-ui';
import D2login from '../components/Login/D2'

class Login extends React.Component {
  constructor(props, context) {
    super(props);
  }
  componentWillMount() {
    let { token } = this.props.location.query;
    //token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjMsInR5cGUiOiJkMiIsInRpbWUiOjE0NzExODczMDR9.eEuetrdHPP-OE98OjJcUrvqPVawZrehLoZrMkJD-PPQ';
    console.log(`token is ${token}`);
    if (token !== undefined) {
      this.context.setToken(token, this.context.onLogin);
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
          <RaisedButton label="D2 登入" onTouchTap={D2login.bind(this)} />
        </Paper>
      </div>
    );
  }
}

Login.contextTypes = {
  setToken: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  server: PropTypes.func.isRequired,
};

export default Login;

