import React, { PropTypes } from 'react';

import { ProfileEditor, ProfileViewer } from '../components/Profile';

const View = ({myinfo, ...props}, {profile, currProfile, ...context}) => (
  <div style={{
    minHeight: '100%',
    backgroundImage: 'url(https://roommate.twmicrosheep.com/static/landing_background.png)',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    paddingTop: 50
  }}>
    <ProfileViewer myinfo={true} profile={myinfo ? profile.data : {}} />
  </div>
);
View.contextTypes = {
  store: PropTypes.object.isRequired,
  profile: PropTypes.object,
};

const Edit = (props) => (
  <div style={{
    minHeight: '100%',
    backgroundImage: 'url(https://roommate.twmicrosheep.com/static/landing_background.png)',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    paddingTop: 50,
    paddingBottom: 50
  }}>
    <ProfileEditor />
  </div>
);

export default { View, Edit };
