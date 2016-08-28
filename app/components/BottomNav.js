import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { Paper, Tabs, Tab, RaisedButton } from 'material-ui';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import SearchIcon from 'material-ui/svg-icons/action/search';
import PersonIcon from 'material-ui/svg-icons/social/person';
import InfoIcon from 'material-ui/svg-icons/action/info-outline';
import ForumIcon from 'material-ui/svg-icons/communication/forum';

/* style quick fix for material-ui pr #4982 */
const centeredIcon = { width: '100%' };
const centeredText = { textAlign: 'center', whiteSpace: 'nowrap' };

const navStyle = {
  position: 'fixed',
  bottom: 0,
  zIndex: 100,
  width: '100vw'
};

const navHref = ["/search", "/user/myinfo", "/privacy", "/contact"];

const BottomNav = (props, context) => {
  const { location: { pathname }, token } = context;
  let authStyle = {};
  if (!token) {
    authStyle.display = 'none';
  }
  return (
    <Paper style={navStyle}>
      <BottomNavigation selectedIndex={navHref.indexOf(pathname)}>
        <BottomNavigationItem
          label="找室友"
          icon={<SearchIcon style={centeredIcon} />}
          containerElement={<Link to={navHref[0]} />}
          style={centeredText}
        />
        <BottomNavigationItem
          label="個人頁面"
          icon={<PersonIcon style={centeredIcon} />}
          containerElement={<Link to={navHref[1]} />}
          style={{...centeredText, ...authStyle}}
        />
        <BottomNavigationItem
          label="隱私權條款"
          icon={<InfoIcon style={centeredIcon} />}
          containerElement={<Link to={navHref[2]} />}
          style={centeredText}
        />
        <BottomNavigationItem
          label="聯絡我們"
          icon={<ForumIcon style={centeredIcon} />}
          containerElement={<Link to={navHref[3]} />}
          style={centeredText}
        />
      </BottomNavigation>
    </Paper>
  );
};

BottomNav.contextTypes = {
  location: PropTypes.object,
  token: PropTypes.string
};

export default BottomNav;
