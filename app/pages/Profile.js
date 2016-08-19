import React, { PropTypes } from 'react';
import { Paper, RaisedButton } from 'material-ui';

class Profile extends React.Component {
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
        Profiles
      </div>
    );
  }
}

Profile.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default Profile;

