import React, { PropTypes } from 'react';
import { Paper, Tabs, Tab, RaisedButton } from 'material-ui';
import { GridList } from 'material-ui/GridList';
import SimpleProfile from '../components/SimpleProfile';
import SearchBar from '../components/SearchBar';

const searchResultStyle = {
  maxWidth: '80%',
  margin: '0 auto',
  overflow: 'visible',
  paddingBottom: 20
};

class Search extends React.Component {
  constructor(...args) {
    super(...args);
  }
  componentWillUnmount() {
    this.context.store.dispatch({
      type: 'CLEAN_SEARCH'
    });
  }
  render() {
    const searchResultJSX = this.context.search.data.map(profile => (
      <SimpleProfile key={`user-${profile.uid}`} data={profile} style={{margin: '20px 0'}} />
    ));
    return (
      <div
        style={{
          minHeight: '100%',
          backgroundImage: 'url(https://roommate.twmicrosheep.com/static/landing_background.png)',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto', padding: '50px 0' }}>
          <Paper style={{ display: 'inline-block', padding: 20 }}>
            <h5>請先至下方 個人頁面 填寫個人資料！謝謝！</h5>
            <h5>查詢宿舍請到 <a href="http://dormapply2.adm.nctu.edu.tw/freshman_query/">住服組查詢系統</a></h5>
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
