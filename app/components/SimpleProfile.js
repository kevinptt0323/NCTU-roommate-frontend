import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Avatar from 'material-ui/Avatar';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { GridTile } from 'material-ui/GridList';

const SimpleProfile = ({data, ...props}, context) => {
  let classString;
  if (data.class_id) {
    classString = context.classes.data[data.class_id].class_name;
  }
  let roomString;
  if (data.room) {
    roomString = context.buildings.data[data.room.building_id].building_name + ' ' + data.room.room_name;
  }
  return (
    <Card style={{height: '100%'}}>
      <CardHeader
        title={data.student_name}
        subtitle={classString}
        avatar={<Avatar>{data.student_name[0]}</Avatar>}
      />
      <CardText>
      </CardText>
      <CardActions>
        <FlatButton label="個人資訊" primary={true} containerElement={<Link to={`/user/info/${data.uid}`} />} />
      </CardActions>
    </Card>
  );
};

SimpleProfile.contextTypes = {
  buildings: PropTypes.object,
  classes: PropTypes.object
};

export default SimpleProfile;
