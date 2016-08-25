import React, { PropTypes } from 'react';

import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SearchIcon from 'material-ui/svg-icons/action/search';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.changeSelect1 = this.changeSelect1.bind(this);
    this.changeText = this.changeText.bind(this);
  }
  changeText(e) {
    const { value } = e.target;
  }
  changeSelect1(e, index, value) {
    this.setState({ select1: value });
  }
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <SelectField value={this.state.select1} onChange={this.changeSelect1} style={{ verticalAlign: 'top' }}>
          <MenuItem value="building_id" primaryText="宿舍" />
          <MenuItem value="class_id" primaryText="科系" />
          <MenuItem value="student_name" primaryText="名字" />
          <MenuItem value="student_id" primaryText="學號" />
          <MenuItem value="email" primaryText="Email" />
        </SelectField>
        <TextField value={this.state.text} onChange={this.changeText} />
        <RaisedButton primary={true} icon={<SearchIcon />} />
      </div>
    );
  }
};



export default SearchBar;
