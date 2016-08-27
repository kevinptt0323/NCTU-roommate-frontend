import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { Paper, Tabs, Tab, RaisedButton } from 'material-ui';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import IconSearch from 'material-ui/svg-icons/action/search';
import IconPerson from 'material-ui/svg-icons/social/person';

/* style quick fix for material-ui pr #4982 */
const centeredIcon = { width: '100%' };
const centeredText = { textAlign: 'center' };
const searchIcon = <IconSearch style={centeredIcon} />;
const personIcon = <IconPerson style={centeredIcon} />;

const navStyle = {
  position: 'fixed',
  bottom: 0,
  zIndex: 100,
  width: '100vw'
};

const navHref = ["/search", "/user/myinfo", "/privacy", "/contact"];

const BottomNav = (props, context) => {
  const { location } = context;
  return (
    <Paper style={navStyle}>
      <BottomNavigation selectedIndex={navHref.indexOf(location.pathname)}>
        <BottomNavigationItem
          label="找室友"
          icon={searchIcon}
          containerElement={<Link to={navHref[0]} />}
          style={centeredText}
        />
        <BottomNavigationItem
          label="個人頁面"
          icon={personIcon}
          containerElement={<Link to={navHref[1]} />}
          style={centeredText}
        />
        <BottomNavigationItem
          label="隱私權條款"
          icon={personIcon}
          containerElement={<Link to={navHref[2]} />}
          style={centeredText}
        />
        <BottomNavigationItem
          label="聯絡我們"
          icon={personIcon}
          containerElement={<Link to={navHref[3]} />}
          style={centeredText}
        />
      </BottomNavigation>
    </Paper>
  );
};

BottomNav.contextTypes = {
  location: PropTypes.object
};

export default BottomNav;
