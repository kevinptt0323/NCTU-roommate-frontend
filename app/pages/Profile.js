import React, { PropTypes } from 'react';

import { ProfileEditor, ProfileViewer } from '../components/Profile';

const View = (props, {store, ...context}) => {
  return (
    <ProfileViewer profile={store.getState().profile.data} />
  );
};
View.contextTypes = {
  store: React.PropTypes.object.isRequired
};

const Edit = (props) => (
  <ProfileEditor />
);

export default { View, Edit };
