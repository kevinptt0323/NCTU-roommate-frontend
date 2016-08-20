import React, { PropTypes } from 'react';
import update from 'react-addons-update';
import { Paper, RaisedButton, FlatButton, SelectField, MenuItem, TextField } from 'material-ui';

class ProfileEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { formData: { class_id: null } };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  handleTextChange(e) {
    let formData = update(this.state.formData, {$merge: {[e.target.name]: e.target.value}});
    this.setState({
      formData
    });
  }
  handleSelectChange(e, index, value) {
    let formData = update(this.state.formData, {$merge: {class_id: value}});
    this.setState({
      formData
    });
  }
  render() {
    const formStyle = {
      maxWidth: 600,
      margin: '50px auto',
      padding: '0 25px 25px'
    }
    const departments = [
      '資訊工程學系',
      '電機系',
    ].map((value,index) => (<MenuItem key={index+1} value={index+1} primaryText={value} />));
    return (
      <Paper style={formStyle}>
        <TextField
          fullWidth={true}
          onChange={this.handleTextChange}
          name="student_name"
          floatingLabelText="姓名 (非公開)" />
        <TextField
          fullWidth={true}
          onChange={this.handleTextChange}
          name="student_nickname"
          floatingLabelText="暱稱" />
        <SelectField
          fullWidth={true}
          maxHeight={200}
          value={this.state.formData.class_id}
          onChange={this.handleSelectChange}
          name="class_id"
          floatingLabelText="學系"
        >
          {departments}
        </SelectField>
        <TextField
          fullWidth={true}
          onChange={this.handleTextChange}
          name="student_id"
          floatingLabelText="學號" />
        <TextField
          fullWidth={true}
          onChange={this.handleTextChange}
          name="room_id"
          floatingLabelText="房間" />
        <TextField
          fullWidth={true}
          onChange={this.handleTextChange}
          name="email"
          floatingLabelText="e-mail" />
        <TextField
          fullWidth={true}
          onChange={this.handleTextChange}
          name="facebook_id"
          floatingLabelText="facebook" />
        <TextField
          fullWidth={true}
          onChange={this.handleTextChange}
          name="slogan"
          floatingLabelText="標語" />
        <TextField
          fullWidth={true}
          multiLine={true}
          rows={2}
          onChange={this.handleTextChange}
          name="detail"
          floatingLabelText="自我介紹" />
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <RaisedButton primary={true} label="儲存" />
        </div>
      </Paper>
    );
  }
}

export { ProfileEditor };
