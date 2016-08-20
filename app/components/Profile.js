import React, { PropTypes } from 'react';
import update from 'react-addons-update';
import {
  Paper,
  RaisedButton,
  Divider,
  FlatButton,
  SelectField,
  MenuItem,
  TextField
} from 'material-ui';
import deepEqual from 'deep-equal';

import { sendAjax } from '../actions/api';
import ProgressPaper from '../components/ProgressPaper';

const errorMessage = {
  cantBeEmpty: "不可為空白"
};

const formStyle = {
  maxWidth: 600,
  margin: '50px auto',
  paddingBottom: 25
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

    this.textInputProps = {
      onChange: this.handleTextChange,
      underlineShow: false,
      style: {
        width: 'calc(100% - 40px)',
        marginLeft: 20,
      },
    };
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
            {...this.textInputProps}
            value={formData.student_name}
            errorText={errorText.student_name}
            name="student_name"
            floatingLabelText="姓名 (非公開)" />
          <Divider />
          <TextField
            {...this.textInputProps}
            value={formData.student_nickname}
            errorText={errorText.student_nickname}
            name="student_nickname"
            floatingLabelText="暱稱" />
          <Divider />
          <SelectField
            {...this.textInputProps}
            maxHeight={200}
            value={formData.class_id}
            onChange={this.handleSelectChange}
            errorText={errorText.class_id}
            name="class_id"
            floatingLabelText="學系"
          >
            {departments}
          </SelectField>
          <Divider />
          <TextField
            {...this.textInputProps}
            value={formData.student_id}
            errorText={errorText.student_id}
            name="student_id"
            floatingLabelText="學號" />
          <Divider />
          <TextField
            {...this.textInputProps}
            value={formData.room_id}
            errorText={errorText.room_id}
            name="room_id"
            floatingLabelText="房間" />
          <Divider />
          <TextField
            {...this.textInputProps}
            value={formData.email}
            errorText={errorText.email}
            name="email"
            floatingLabelText="e-mail" />
          <Divider />
          <TextField
            {...this.textInputProps}
            value={formData.facebook_id}
            errorText={errorText.facebook_id}
            name="facebook_id"
            floatingLabelText="facebook" />
          <Divider />
          <TextField
            {...this.textInputProps}
            value={formData.slogan}
            errorText={errorText.slogan}
            name="slogan"
            floatingLabelText="標語" />
          <Divider />
          <TextField
            {...this.textInputProps}
            multiLine={true}
            rows={2}
            value={formData.detail}
            errorText={errorText.detail}
            name="detail"
            floatingLabelText="自我介紹" />
          <Divider />
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
