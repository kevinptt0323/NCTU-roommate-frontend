import React, { PropTypes } from 'react';

import { ProfileEditor, ProfileViewer } from '../components/Profile';

class View extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { store } = this.context;
    return (
      <div>
        <ProfileViewer profile={store.getState().profile.data} />
      </div>
    );
  }
}

View.contextTypes = {
  store: React.PropTypes.object.isRequired
};

class Edit extends React.Component {
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

export default { View, Edit };
