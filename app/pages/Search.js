import React, { PropTypes } from 'react';
import { Paper, Tabs, Tab, RaisedButton } from 'material-ui';

class Dorm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { store } = this.context;
    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
    };
    return (
      <div>
        找室友
      </div>
    );
  }
}

Dorm.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default Dorm;

