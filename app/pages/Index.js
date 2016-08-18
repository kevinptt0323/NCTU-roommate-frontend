import React, { PropTypes } from 'react';
import { Paper, RaisedButton } from 'material-ui';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        Login only<br />
        Your token is {this.context.token}
      </div>
    );
  }
}

Index.contextTypes = {
  store: PropTypes.object.isRequired,
  token: PropTypes.string,
  login: PropTypes.func.isRequired
};

export default Index;
