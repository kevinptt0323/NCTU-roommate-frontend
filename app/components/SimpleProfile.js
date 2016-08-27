import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Avatar from 'material-ui/Avatar';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { GridTile } from 'material-ui/GridList';

const SimpleProfile = ({data: profile, ...props}, {classes, buildings, ...context}) => {
  let classString;
  if (profile.class_id) {
    classString = classes.data.find(({class_id}) => class_id==profile.class_id).class_name;
  }
  let roomString;
  if (profile.room) {
    roomString = buildings.data.find(({building_id}) => building_id==profile.building_id).building_name + ' ' + profile.room_name;
  }
  return (
    <Card style={{height: '100%'}}>
      <CardHeader
        title={profile.student_name}
        subtitle={classString}
        avatar={<Avatar>{profile.student_name[0]}</Avatar>}
      />
      <CardText>
      </CardText>
      <CardActions>
        <FlatButton label="個人資訊" primary={true} containerElement={<Link to={`/user/info/${profile.uid}`} />} />
      </CardActions>
    </Card>
  );
};

SimpleProfile.contextTypes = {
  buildings: PropTypes.object,
  classes: PropTypes.object
};

export default SimpleProfile;
