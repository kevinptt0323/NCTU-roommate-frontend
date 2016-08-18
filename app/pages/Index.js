import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Paper, RaisedButton } from 'material-ui';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <RaisedButton
          primary={true}
          containerElement={<Link to="/dorms" />}
          label="開始找室友" />
      </div>
    );
  }
}

Index.contextTypes = {
  store: PropTypes.object.isRequired,
  token: PropTypes.string,
  login: PropTypes.func.isRequired
};

export default Index;
