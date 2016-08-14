import React, { PropTypes } from 'react';
import { Paper, RaisedButton } from 'material-ui';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount(nextProps, nextState) {
    if (this.context.getToken()=="") {
      this.context.login();
    }
  }
  render() {
    return (
      <div>
        Login only<br />
        Your token is {this.context.getToken()}
      </div>
    );
  }
}

Index.contextTypes = {
  getToken: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

export default Index;
