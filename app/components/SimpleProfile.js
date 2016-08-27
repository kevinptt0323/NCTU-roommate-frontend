import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Avatar from 'material-ui/Avatar';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import SvgIcon from 'material-ui/SvgIcon';
import { GridTile } from 'material-ui/GridList';

import HomeIcon from 'material-ui/svg-icons/action/home';
import SchoolIcon from 'material-ui/svg-icons/social/school';
import FaceIcon from 'material-ui/svg-icons/action/face';
import MailIcon from 'material-ui/svg-icons/communication/mail-outline';
import QuoteIcon from 'material-ui/svg-icons/editor/format-quote'
import DialogIcon from 'material-ui/svg-icons/action/speaker-notes';
import FacebookIcon from './FacebookIcon';

const SimpleProfile = ({data: profile, ...props}, {classes, buildings, ...context}) => {
  let {
    uid,
    student_name,
    student_nickname,
    class_id,
    student_id,
    room_id,
    room,
    email,
    facebook_id,
    slogan,
    detail
  } = profile;
  let classString;
  if (class_id) {
    classString = classes.data.find(({class_id: _id}) => _id==class_id).class_name;
  }
  let roomString;
  if (profile.room) {
    roomString = buildings.data.find(({building_id: id}) => _id==building_id).building_name + ' ' + room_name;
  }
  const gridStyle = {
    flex: 1,
    width: '50%',
    minWidth: 300,
    margin: '10px 0'
  };
  const iconStyle = {
    marginRight: 10,
    verticalAlign: 'middle'
  };
  return (
    <Card style={props.style}>
      <CardHeader
        title={student_name}
        subtitle={student_nickname}
        avatar={<Avatar>{student_name[0]}</Avatar>}
      />
      <Divider />
      <CardText>
        <div style={gridStyle}><HomeIcon style={iconStyle} />{roomString}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={gridStyle}><SchoolIcon style={iconStyle} />{classString}</div>
          <div style={gridStyle}><MailIcon style={iconStyle} />{email}</div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={gridStyle}><FaceIcon style={iconStyle} />{student_id}</div>
          <div style={gridStyle}><FacebookIcon style={iconStyle} />fb.com/{facebook_id}</div>
        </div>
        <Divider />
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={gridStyle}><QuoteIcon style={iconStyle} />{slogan}</div>
        </div>
        <Divider />
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={gridStyle}><DialogIcon style={iconStyle} />{detail}</div>
        </div>
      </CardText>
    </Card>
  );
};

SimpleProfile.contextTypes = {
  buildings: PropTypes.object,
  classes: PropTypes.object
};

export default SimpleProfile;
