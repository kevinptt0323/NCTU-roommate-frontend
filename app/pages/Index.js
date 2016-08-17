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
  token: PropTypes.string,
};

export default Index;
