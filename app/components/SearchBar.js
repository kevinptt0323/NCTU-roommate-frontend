import React, { PropTypes } from 'react';

import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SearchIcon from 'material-ui/svg-icons/action/search';

import { sendAjax } from '../actions/api';

const classes2JSX = ({class_id, class_name}) => (<MenuItem key={`class-${class_id}`} value={class_id} primaryText={class_name} />);
const buildings2JSX = ({building_id, building_name}) => (<MenuItem key={`building-${building_id}`} value={building_id} primaryText={building_name} />);

class SearchBar extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {};

    this.changeSelect1 = this.changeSelect1.bind(this);
    this.changeSelect2 = this.changeSelect2.bind(this);
    this.changeText = this.changeText.bind(this);
    this.sendSearch = this.sendSearch.bind(this);


    this.menus = {
      student_name: [
        <MenuItem key={`name-accurate`} value="accurate" primaryText="精確搜尋" />,
        <MenuItem key={`name-fuzzy`} value="fuzzy" primaryText="模糊搜尋" />
      ],
      other: [
        <MenuItem key={`other-student_id`} value="student_id" primaryText="學號" />,
        <MenuItem key={`other-email`} value="email" primaryText="Email" />
      ]
    };
  }
  changeSelect1(e, index, value) {
    this.setState({ input1: value, input2: null, input3: "" });
  }
  changeSelect2(e, index, value) {
    this.setState({ input2: value, input3: "" });
  }
  changeText(e) {
    const { value } = e.target;
    this.setState({ input3: value });
  }
  sendSearch() {
    const { store } = this.context;
    let url = '/search';
    switch (this.state.input1) {
      case 'building_id':
        url += '/room';
        break;
      case 'class_id':
        url += '/class';
        break;
      case 'student_name':
        url += '/name';
        break;
      case 'other':
        url += '/other';
        break;
    }
    url += `/${this.state.input2}/?arg=${this.state.input3}`;
    store.dispatch(sendAjax({
      method: 'get',
      path: url,
      withToken: true,
      sendingType: 'SEARCH_USER',
      failureType: 'SEARCH_USER_ERROR'
    })).then(({body}) => {
      store.dispatch({
        type: 'SEARCH_USER_DONE',
        response: body
      });
    });
  }
  render() {
    const { buildings, classes } = this.context;
    let input2Hint = "";
    switch (this.state.input1) {
      case 'building_id':
        input2Hint = '300 (房號)';
        break;
      case 'class_id':
      case 'student_name':
        input2Hint = '謝小恩 (姓名)';
        break;
      case 'other':
        input2Hint = this.state.input2 == 'student_id' ? '0516000' : 'your_email@nctu.edu.tw'
    }
    this.menus.building_id = buildings.data.map(buildings2JSX);
    this.menus.class_id = classes.data.map(classes2JSX);
    return (
      <div>
        <SelectField
          value={this.state.input1}
          onChange={this.changeSelect1}
          style={{ verticalAlign: 'top', margin: '0 5px' }}
          hintText="找室友"
        >
          <MenuItem value="building_id" primaryText="宿舍" />
          <MenuItem value="class_id" primaryText="科系" />
          <MenuItem value="student_name" primaryText="姓名" />
          <MenuItem value="other" primaryText="其他" />
        </SelectField>
        {
          this.state.input1 ?
            <SelectField value={this.state.input2} onChange={this.changeSelect2} style={{ verticalAlign: 'top', margin: '0 5px' }}>
              { this.menus[this.state.input1] }
            </SelectField> :
            null
        }
        {
          this.state.input2 ?
            <TextField style={{ margin: '0 5px' }} value={this.state.input3} hintText={input2Hint} onChange={this.changeText} /> :
            null
        }
        <RaisedButton disabled={!(this.state.input1&&this.state.input2&&this.state.input3)} primary={true} icon={<SearchIcon />} onTouchTap={this.sendSearch} />
      </div>
    );
  }
};

SearchBar.contextTypes = {
  store: PropTypes.object.isRequired,
  classes: PropTypes.object,
  buildings: PropTypes.object,
};


export default SearchBar;
