import React, { PropTypes } from 'react';
import { Paper, Tabs, Tab, RaisedButton } from 'material-ui';
import { GridList } from 'material-ui/GridList';
import SimpleProfile from '../components/SimpleProfile';

const gridStyle = {
  maxWidth: '80%',
  overflowY: 'auto',
  margin: 'auto'
};

class Search extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const searchResult = [
      {"uid": 1, "facebook_id": "123456789", "student_name": "user1", "detail": "", "email": "user1@example.com", "student_id": "0123456", "student_nickname": "user_nick1", "class_id": 6, "slogan": ""},
      {"uid": 2, "facebook_id": "", "student_name": "user2", "detail": "", "email": "user2@example.com", "student_id": "0000000", "student_nickname": "user_nick2", "class_id": 6, "slogan": ""},
      {"uid": 3, "facebook_id": "123456789", "student_name": "user1", "detail": "", "email": "user1@example.com", "student_id": "0123456", "student_nickname": "user_nick1", "class_id": 6, "slogan": ""},
      {"uid": 4, "facebook_id": "", "student_name": "user2", "detail": "", "email": "user2@example.com", "student_id": "0000000", "student_nickname": "user_nick2", "class_id": 6, "slogan": ""},
      {"uid": 5, "facebook_id": "123456789", "student_name": "user1", "detail": "", "email": "user1@example.com", "student_id": "0123456", "student_nickname": "user_nick1", "class_id": 6, "slogan": ""},
      {"uid": 6, "facebook_id": "", "student_name": "user2", "detail": "", "email": "user2@example.com", "student_id": "0000000", "student_nickname": "user_nick2", "class_id": 6, "slogan": ""},
    ];
    const searchResultJSX = searchResult.map(profile => (
      <SimpleProfile data={profile} />
    ));
    return (
      <div>
        <div>
          找室友
        </div>
        <GridList
          style={gridStyle}
          cols={4}
          padding={1}
        >
          { searchResultJSX }
        </GridList>
      </div>
    );
  }
}

Search.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default Search;
