import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Paper from 'material-ui/Paper';
import { GridTile } from 'material-ui/GridList';

const SimpleProfile = ({data, ...props}, context) => (
  <GridTile
    key={data.student_id}
    title={data.student_name}
    actionPosition="left"
    titlePosition="top"
    titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
    containerElement={<Link to={`/user/info/${data.uid}`} />}
  >
  </GridTile>
);

export default SimpleProfile;
