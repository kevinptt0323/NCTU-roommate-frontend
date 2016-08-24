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

class BottomNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  select = (index) => this.setState({selectedIndex: index});

  render() {
    return (
      <Paper style={navStyle}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="找室友"
            icon={searchIcon}
            containerElement={<Link to="/search" />}
            style={centeredText}
            onTouchTap={() => this.select(0)}
          />
          <BottomNavigationItem
            label="個人頁面"
            icon={personIcon}
            containerElement={<Link to="/user/myinfo" />}
            style={centeredText}
            onTouchTap={() => this.select(1)}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

BottomNav.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default BottomNav;


