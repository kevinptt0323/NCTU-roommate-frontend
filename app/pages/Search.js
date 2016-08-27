import React, { PropTypes } from 'react';
import { Paper, Tabs, Tab, RaisedButton } from 'material-ui';
import { GridList } from 'material-ui/GridList';
import SimpleProfile from '../components/SimpleProfile';
import SearchBar from '../components/SearchBar';

const searchResultStyle = {
  maxWidth: '80%',
  margin: '0 auto 20px',
  overflow: 'visible'
};

class Search extends React.Component {
  constructor(...args) {
    super(...args);
  }
  render() {
    const searchResultJSX = this.context.search.data.map(profile => (
      <SimpleProfile key={`user-${profile.uid}`} data={profile} />
    ));
    return (
      <div
        style={{
          minHeight: '100%',
          backgroundImage: 'url(https://roommate.twmicrosheep.com/static/landing_background.png)',
          backgroundSize: 'cover'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto', padding: '50px 0' }}>
          <Paper style={{ display: 'inline-block', padding: 20 }}>
            <SearchBar />
          </Paper>
        </div>
        <div style={searchResultStyle}>
          { searchResultJSX }
        </div>
      </div>
    );
  }
}

Search.contextTypes = {
  store: React.PropTypes.object.isRequired,
  search: PropTypes.object,
};

export default Search;
