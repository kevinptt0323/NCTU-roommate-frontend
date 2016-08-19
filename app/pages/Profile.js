import React, { PropTypes } from 'react';
import { } from 'material-ui';

import { ProfileEditor } from '../components/Profile';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { store } = this.context;
    return (
      <div>
        <ProfileEditor />
      </div>
    );
  }
}

Profile.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default Profile;

