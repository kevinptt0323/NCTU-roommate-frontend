import React, { PropTypes } from 'react';
import update from 'react-addons-update';
import { Paper, RaisedButton, FlatButton, SelectField, MenuItem, TextField } from 'material-ui';
import deepEqual from 'deep-equal';

import { sendAjax } from '../actions/api';
import ProgressPaper from '../components/ProgressPaper';

const errorMessage = {
  cantBeEmpty: "不可為空白"
};

const formStyle = {
  maxWidth: 600,
  margin: '50px auto',
  padding: '0 25px 25px'
};

const departments = [
  '資訊工程學系',
  '電機系',
].map((value,index) => (<MenuItem key={index+1} value={index+1} primaryText={value} />));

class ProfileEditor extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = { formData: {}, errorText: {}, modified: false };

    this.formDataKeys = ['student_name', 'student_nickname', 'class_id', 'student_id', 'room_id', 'email', 'facebook_id', 'slogan', 'detail'];
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.submit = this.submit.bind(this);

    context.store.dispatch(sendAjax({
      method: 'get',
      path: '/user/myinfo/',
      withToken: true,
      sendingType: 'GET_PROFILE',
      successType: 'GET_PROFILE_DONE',
      failureType: 'GET_PROFILE_ERROR'
    }));
  }
  validate(keys, onSuccess, onFailure) {
    const { formData } = this.state;
    let errorText = {};
    if (!Array.isArray(keys)) {
      this.validate([keys]);
      return;
    }
    let failure = false;
    keys.forEach(key => {
      errorText[key] = !!formData[key] ? "" : errorMessage.cantBeEmpty;
      failure = failure || !!errorText[key];
    });
    errorText = update(this.state.errorText, {$merge: errorText});
    this.setState({ errorText }, failure ? onFailure : onSuccess);
  }
  submit() {
    let data = {...this.context.profile.data, ...this.state.formData};
    this.setState({ formData: data, modified: true }, () => {
      this.validate(this.formDataKeys, () => {
        this.context.store.dispatch(sendAjax({
          method: 'patch',
          path: '/user/myinfo/modify/',
          withToken: true,
          sendingType: 'SEND_PROFILE',
          successType: 'SEND_PROFILE_DONE',
          failureType: 'SEND_PROFILE_ERROR'
        }));
      })
    });
  }
  handleTextChange(e) {
    const { name: key, value } = e.target;
    let formData = this.state.formData;
    if (!this.state.modified) {
      formData = update(this.state.formData, {$merge: this.context.profile.data});
    }
    formData = {...formData, [key]: value};
    this.setState({ formData, modified: true }, () => this.validate(key));
  }
  handleSelectChange(e, index, value) {
    const key = 'class_id';
    let formData = this.state.formData;
    if (!this.state.modified) {
      formData = update(this.state.formData, {$merge: this.context.profile.data});
    }
    formData = {...formData, [key]: value};
    this.setState({ formData, modified: true }, () => this.validate(key));
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const { formData, errorText } = this.state;
    const { formData: formData2, errorText: errorText2 } = nextState;
    return !deepEqual(formData, formData2)
        || !deepEqual(errorText, errorText2)
        || this.context.profile.sending != nextContext.profile.sending;
  }
  render() {
    const { profile } = this.context;
    let { formData, errorText, modified } = this.state;
    if (!modified) {
      formData = profile.data || {};
    }
    return (
      <ProgressPaper style={formStyle} loading={profile.sending}>
        <div>
          <TextField
            fullWidth={true}
            value={formData.student_name}
            onChange={this.handleTextChange}
            errorText={errorText.student_name}
            name="student_name"
            floatingLabelText="姓名 (非公開)" />
          <TextField
            fullWidth={true}
            value={formData.student_nickname}
            onChange={this.handleTextChange}
            errorText={errorText.student_nickname}
            name="student_nickname"
            floatingLabelText="暱稱" />
          <SelectField
            fullWidth={true}
            maxHeight={200}
            value={formData.class_id}
            onChange={this.handleSelectChange}
            errorText={errorText.class_id}
            name="class_id"
            floatingLabelText="學系"
          >
            {departments}
          </SelectField>
          <TextField
            fullWidth={true}
            value={formData.student_id}
            onChange={this.handleTextChange}
            errorText={errorText.student_id}
            name="student_id"
            floatingLabelText="學號" />
          <TextField
            fullWidth={true}
            value={formData.room_id}
            onChange={this.handleTextChange}
            errorText={errorText.room_id}
            name="room_id"
            floatingLabelText="房間" />
          <TextField
            fullWidth={true}
            value={formData.email}
            onChange={this.handleTextChange}
            errorText={errorText.email}
            name="email"
            floatingLabelText="e-mail" />
          <TextField
            fullWidth={true}
            value={formData.facebook_id}
            onChange={this.handleTextChange}
            errorText={errorText.facebook_id}
            name="facebook_id"
            floatingLabelText="facebook" />
          <TextField
            fullWidth={true}
            value={formData.slogan}
            onChange={this.handleTextChange}
            errorText={errorText.slogan}
            name="slogan"
            floatingLabelText="標語" />
          <TextField
            fullWidth={true}
            multiLine={true}
            rows={2}
            value={formData.detail}
            onChange={this.handleTextChange}
            errorText={errorText.detail}
            name="detail"
            floatingLabelText="自我介紹" />
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <RaisedButton primary={true} label="儲存" onTouchTap={this.submit} />
          </div>
        </div>
      </ProgressPaper>
    );
  }
}

ProfileEditor.contextTypes = {
  store: React.PropTypes.object.isRequired,
  profile: React.PropTypes.object,
};

export { ProfileEditor };
