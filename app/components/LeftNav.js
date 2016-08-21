import React, { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';

class LeftNav extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);

    this.state = {
      open: false,
    };
  }
  handleToggle() {
    this.setState({ open: !this.state.open });
  }
  onMenuListTap(fn) {
    fn.apply(this);
    this.handleToggle();
  }
  render() {
    return (
      <Drawer
        width={300}
        docked={false}
        open={this.state.open}
        onRequestChange={this.handleToggle}
      >
        <Card>
          <CardMedia
            overlay={<CardTitle title={this.props.username} subtitle="你好" />}
          >
            <img src="img/sidenav-wallpaper.png" />
          </CardMedia>
        </Card>
        {this.props.children}
      </Drawer>
    );
  }
}

const LeftNavItem = props => (
  <MenuItem
    {...props}
  />
);

export { LeftNav, LeftNavItem };

export default LeftNav;
