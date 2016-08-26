import React, { PropTypes } from 'react';
import { Paper, Tabs, Tab, RaisedButton } from 'material-ui';
import { GridList } from 'material-ui/GridList';
import SimpleProfile from '../components/SimpleProfile';
import SearchBar from '../components/SearchBar';

const gridStyle = {
  maxWidth: '80%',
  overflowY: 'auto',
  margin: 'auto'
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
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '50px auto' }}>
          <Paper style={{ display: 'inline-block', padding: 20 }}>
            <SearchBar />
          </Paper>
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
  store: React.PropTypes.object.isRequired,
  search: PropTypes.object,
};

export default Search;
