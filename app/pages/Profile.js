import React, { PropTypes } from 'react';

import { ProfileEditor, ProfileViewer } from '../components/Profile';

const View = ({myinfo, ...props}, {profile, currProfile, ...context}) => (
  <div style={{
    minHeight: '100%',
    backgroundImage: 'url(https://roommate.twmicrosheep.com/static/landing_background.png)',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
  }}>
    <ProfileViewer className="css-top" myinfo={true} profile={myinfo ? profile.data : {}} />
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
  }}>
    <ProfileEditor className="css-top" />
  </div>
);

export default { View, Edit };
