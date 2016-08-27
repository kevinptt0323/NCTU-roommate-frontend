import React, { PropTypes } from 'react';

import { ProfileEditor, ProfileViewer } from '../components/Profile';

const View = ({myinfo, ...props}, {profile, currProfile, ...context}) => (
  <ProfileViewer myinfo={true} profile={myinfo ? profile.data : {}} />
);
View.contextTypes = {
  store: PropTypes.object.isRequired,
  profile: PropTypes.object,
};

const Edit = (props) => (
  <ProfileEditor />
);

export default { View, Edit };
