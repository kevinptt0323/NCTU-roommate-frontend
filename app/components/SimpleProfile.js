import React, { PropTypes } from 'react';

import Paper from 'material-ui/Paper';

const SimpleProfile = (props, context) => (
  <Paper>
    {props.data.student_name}
  </Paper>
);

export default SimpleProfile;
