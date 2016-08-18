import React, { PropTypes } from 'react';
import { Paper, RaisedButton } from 'material-ui';

class Dorm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { store } = this.context;
    return (
      <div>
        Login only<br />
        Your token is {store.getState().auth.token}
      </div>
    );
  }
}

Dorm.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default Dorm;

