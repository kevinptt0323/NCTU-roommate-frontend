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
    building_id,
    room_name,
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
  if (building_id) {
    roomString = buildings.data.find(({building_id: _building_id}) => _building_id==building_id).building_name + ' ' + room_name;
  }
  let facebook_url = facebook_id ? `//fb.com/${facebook_url}` : '';
  const gridStyle = {
    flex: 1,
    width: '50%',
    margin: '10px 0',
    wordBreak: 'break-all'
  };
  const iconStyle = {
    marginRight: 10,
    verticalAlign: 'middle'
  };
  return (
    <Card style={props.style} className="ui-card">
      <CardHeader
        title={student_name}
        subtitle={student_nickname}
        avatar={!!facebook_id ?
          <Avatar src={`http://graph.facebook.com/v2.7/${facebook_id}/picture`} alt={student_name[0]} /> :
          <Avatar>{student_name[0].toUpperCase()}</Avatar>
        }
      />
      <Divider />
      <CardText className="ui-cardText">
        <div style={gridStyle}><HomeIcon style={iconStyle} />{roomString}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={gridStyle}><SchoolIcon style={iconStyle} />{classString}</div>
          <div style={gridStyle}><MailIcon style={iconStyle} />{email}</div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={gridStyle}><FaceIcon style={iconStyle} />{student_id}</div>
          <div style={gridStyle}><FacebookIcon style={iconStyle} />{
            !!facebook_url ? <a href={facebook_url} target="_blank">我的 FB 連結</a> : null
          }</div>
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
