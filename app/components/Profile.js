import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import update from 'react-addons-update';
import { push } from 'react-router-redux';
import {
  RaisedButton,
  Divider,
  FlatButton,
  List, ListItem,
  SelectField,
  MenuItem,
  TextField
} from 'material-ui';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import { grey100, grey700 } from 'material-ui/styles/colors';
import deepEqual from 'deep-equal';

import { sendAjax } from '../actions/api';
import ProgressPaper from '../components/ProgressPaper';

const formDataKeys = ['student_name', 'student_nickname', 'class_id', 'student_id', 'room_id', 'email', 'facebook_id', 'slogan', 'detail'];

const errorMessage = {
  cantBeEmpty: "不可為空白"
};

const strings = {
  profile: {
    student_name: '姓名',
    student_nickname: '暱稱',
    class_id: '科系',
    student_id: '學號',
    room_id: '房間',
    email: 'email',
    facebook_id: 'facebook',
    slogan: '標語',
    detail: '自我介紹',
  }
};

const editorStyle = {
  maxWidth: 600,
  margin: '50px auto',
  paddingBottom: 25
};

const viewerStyle = {
  maxWidth: 600,
  margin: '50px auto',
}

const classes2JSX = ({class_id, class_name}) => (<MenuItem key={class_id} value={class_id} primaryText={class_name} />);

class ProfileEditor extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = { formData: {}, errorText: {}, modified: false };

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
    const { store, dispatch, profile, loadProfile } = this.context;
    let data = {...profile.data, ...this.state.formData};
    this.setState({ formData: data, modified: true }, () => {
      this.validate(formDataKeys, () => {
        store.dispatch(sendAjax({
          method: 'patch',
          path: '/user/myinfo/modify/',
          withToken: true,
          body: this.state.formData,
          sendingType: 'SEND_PROFILE',
          failureType: 'SEND_PROFILE_ERROR'
        })).then(() => {
          loadProfile();
          store.dispatch(push('/user/myinfo'));
        }).catch(error => {
          store.dispatch({
            type: 'GET_PROFILE_ERROR',
            response: error
          });
        });
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
    const { profile, classes, buildings } = this.context;
    let { formData, errorText, modified } = this.state;
    if (!modified) {
      formData = profile.data || {};
    }
    const textFields = formDataKeys
      .map((key) => {
        const props = {
          ...this.textInputProps,
          key,
          onChange: this.handleTextChange,
          value: formData[key],
          errorText: errorText[key],
          name: key,
          floatingLabelText: strings.profile[key]
        };
        switch (key) {
          case 'class_id':
            return (
              <SelectField {...props} onChange={this.handleSelectChange} maxHeight={200}>
                {classes.data.map(classes2JSX)}
              </SelectField>
            );
          case 'detail':
            return (
              <TextField {...props} multiLine={true} rows={2} />
            );
          default:
            return (
              <TextField {...props} />
            );
        }
      })
      .reduce((prev, curr, index) => (
        !!prev ? [...prev, <Divider key={`divider-${index}`} />, curr] : [curr]
      ), null);
    return (
      <ProgressPaper style={editorStyle} loading={profile.sending}>
        <div>
          { textFields }
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
  store: PropTypes.object.isRequired,
  profile: PropTypes.object,
  classes: PropTypes.object,
  buildings: PropTypes.object,
  loadProfile: PropTypes.func.isRequired
};

const ProfileViewer = (props, context) => {
  const { profile = {}, editable = false } = props;
  const { classes, buildings } = context;
  const profileList = formDataKeys
    .filter(key => !!profile[key])
    .map((key, index) => {
      let text = "";
      switch(key) {
        case 'class_id':
          text = classes.data.find(({class_id}) => class_id==profile[key]).class_name;
          break;
        default:
          text = profile[key];
      }
      return (
        <ListItem
          key={index}
          primaryText={strings.profile[key]}
          secondaryText={text}
        />
      );
    })
    .reduce((prev, curr, index) => (
      !!prev ? [...prev, <Divider key={`divider-${index}`} />, curr] : [curr]
    ), null);
  return (
    <ProgressPaper style={viewerStyle}>
      <List>
        { profileList }
      </List>
    </ProgressPaper>
   )
};
ProfileViewer.contextTypes = {
  classes: PropTypes.object,
  buildings: PropTypes.object
};
const EditButton = () => (
  <IconButton
    containerElement={<Link to="/user/myinfo/modify" />}
    touch={true}
    tooltip="編輯"
    tooltipPosition="bottom-left"
  >
    <EditIcon color={grey100} />
  </IconButton>
);

export { ProfileEditor, ProfileViewer, EditButton };
