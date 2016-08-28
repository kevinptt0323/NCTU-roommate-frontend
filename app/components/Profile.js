import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import update from 'react-addons-update';
import { push } from 'react-router-redux';
import {
  Checkbox,
  RaisedButton,
  Divider,
  Dialog,
  FlatButton,
  List, ListItem,
  SelectField,
  MenuItem,
  TextField
} from 'material-ui';
import Toggle from 'material-ui/Toggle';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import { grey100, grey700 } from 'material-ui/styles/colors';
import deepEqual from 'deep-equal';

import { sendAjax } from '../actions/api';
import ProgressPaper from './ProgressPaper';
import Privacy from '../pages/Privacy';

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
    room_id: ['宿舍', '房號'],
    email: 'E-mail',
    facebook_id: 'Facebook ID ( http://findmyfbid.com/ )',
    slogan: '標語',
    detail: '自我介紹',
  }
};

const editorStyle = {
  maxWidth: 600,
  margin: 'auto'
};

const viewerStyle = {
  maxWidth: 600,
  margin: 'auto'
}

const classes2JSX = ({class_id, class_name}) => (<MenuItem key={`class-${class_id}`} value={class_id} primaryText={class_name} />);
const buildings2JSX = ({building_id, building_name}) => (<MenuItem key={`building-${building_id}`} value={building_id} primaryText={building_name} />);

class ProfileEditor extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = { formData: {}, errorText: {}, modified: false, agree: false, open: false };

    this.classMenu = context.classes.data.map(classes2JSX);
    this.buildingMenu = context.buildings.data.map(buildings2JSX);

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.submit = this.submit.bind(this);
    this.togglePrivacyDialog = this.togglePrivacyDialog.bind(this);
    this.handleCheck = this.handleCheck.bind(this);

    this.textInputProps = {
      onChange: this.handleTextChange,
      underlineShow: false,
      style: {
        width: 'calc(100% - 140px)',
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
      switch(key) {
        case 'student_name':
          errorText[key] = !!formData[key] ? "" : errorMessage.cantBeEmpty;
          failure = failure || !!errorText[key];
      }
    });
    errorText = update(this.state.errorText, {$merge: errorText});
    this.setState({ errorText }, failure ? onFailure : onSuccess);
  }
  submit() {
    const { store, dispatch, profile, loadProfile } = this.context;
    let data = {...profile.data, ...this.state.formData};
    this.setState({ formData: data, modified: true }, () => {
      this.validate(formDataKeys, () => {
        const formData = {...this.state.formData};
        formData.room = { building_id: formData.building_id, room_name: formData.room_name };
        formData.room_id = undefined;
        store.dispatch(sendAjax({
          method: 'patch',
          path: '/user/myinfo/modify/',
          withToken: true,
          body: formData,
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
  togglePrivacyDialog() {
    this.setState({ open: !this.state.open });
  }
  handleCheck(e, value) {
    this.setState({ agree: value });
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
  handleSelectChange(key, e, index, value) {
    let formData = this.state.formData;
    if (!this.state.modified) {
      formData = update(this.state.formData, {$merge: this.context.profile.data});
    }
    formData = {...formData, [key]: value};
    this.setState({ formData, modified: true }, () => this.validate(key));
  }
  handleToggle(e, value) {
    const { name: key } = e.target;
    let formData = this.state.formData;
    if (!this.state.modified) {
      formData = update(this.state.formData, {$merge: this.context.profile.data});
    }
    formData = {...formData, [key]: value};
    this.setState({ formData, modified: true }, () => this.validate(key));
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const { formData, errorText, open, agree } = this.state;
    const { formData: formData2, errorText: errorText2, open: open2, agree: agree2 } = nextState;
    return !deepEqual(formData, formData2)
        || !deepEqual(errorText, errorText2)
        || this.context.profile.sending != nextContext.profile.sending
        || open != open2
        || agree != agree2;
  }
  render() {
    const { profile } = this.context;
    let { formData, errorText, modified } = this.state;
    let ret;
    if (!modified) {
      formData = profile.data;
    }
    const textFields = formDataKeys
      .map(key => {
        const props = {
          ...this.textInputProps,
          key,
          value: formData[key],
          errorText: errorText[key],
          name: key,
          floatingLabelText: strings.profile[key]
        };
        switch (key) {
          case 'class_id':
            ret = (
              <SelectField {...props} onChange={this.handleSelectChange.bind(this, 'class_id')} maxHeight={200}>
                {this.classMenu}
              </SelectField>
            );
            break;
          case 'room_id':
            ret = (
              <div>
                <SelectField
                  style={{ paddingLeft: 20, verticalAlign: 'top' }}
                  underlineShow={false}
                  key='building_id'
                  value={formData['building_id']}
                  errorText={errorText['building_id']}
                  name='building_id'
                  floatingLabelText={props.floatingLabelText[0]}
                  onChange={this.handleSelectChange.bind(this, 'building_id')}
                  maxHeight={200}
                >
                  {this.buildingMenu}
                </SelectField>
                <TextField
                  style={{ paddingLeft: 20 }}
                  underlineShow={false}
                  key='room_name'
                  value={formData['room_name']}
                  errorText={errorText['room_name']}
                  name='room_name'
                  floatingLabelText={props.floatingLabelText[1]}
                  onChange={this.handleTextChange}
                />
              </div>
            );
            break;
          case 'detail':
            ret = <TextField {...props} multiLine={true} rows={2} />;
            break;
          default:
            ret = <TextField {...props} />;
        }
        let toggled = key=='student_name' || !!formData[`${key}_enable`];
        return (
          <div key={`row-${key}`} style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
            <Toggle
              disabled={key=='student_name'}
              toggled={toggled}
              style={{ position: 'absolute', right: 20, width: 'initial' }}
              label={toggled ? "公開" : "不公開"}
              onToggle={this.handleToggle}
              name={`${key}_enable`}
            />
            {ret}
          </div>
        );
      })
      .reduce((prev, curr, index) => (
        !!prev ? [...prev, <Divider key={`divider-${index}`} />, curr] : [curr]
      ), null);
    return (
      <ProgressPaper style={{...editorStyle, ...this.props.style}} loading={profile.sending}>
        <div>
          { textFields }
          <Divider />
          <div style={{ padding: 20 }}>
            <Checkbox checked={this.state.agree} onCheck={this.handleCheck} label="我已閱讀並同意隱私權條款，且上方資料並無造假。" />
          </div>
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <FlatButton primary={true} label="閱讀隱私權條款" onTouchTap={this.togglePrivacyDialog} />
            <RaisedButton disabled={!this.state.agree || profile.sending} secondary={true} label="儲存" onTouchTap={this.submit} />
          </div>
        </div>
        <Dialog open={this.state.open} autoScrollBodyContent={true} onRequestClose={this.togglePrivacyDialog}>
          <Privacy />
        </Dialog>
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
      let enableString = (key=='student_name' || profile[`${key}_enable`]) ? "" : " (不公開)";
      switch(key) {
        case 'class_id':
          text = classes.data.find(({class_id}) => class_id==profile[key]).class_name;
          break;
        case 'room_id':
          text = buildings.data.find(({building_id}) => building_id==profile.building_id).building_name + ' ' + profile.room_name;
          break;
        default:
          text = profile[key];
      }
      return (
        <ListItem
          key={index}
          primaryText={strings.profile[key] + enableString}
          secondaryText={text}
        />
      );
    })
    .reduce((prev, curr, index) => (
      !!prev ? [...prev, <Divider key={`divider-${index}`} />, curr] : [curr]
    ), null);
  return (
    <ProgressPaper style={{...viewerStyle, ...props.style}}>
      <List>
        { profileList }
      </List>
      {
        props.myinfo ? [
          <Divider />,
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <RaisedButton secondary={true} label="編輯" containerElement={<Link to="/user/myinfo/modify" />} />
          </div>] :
        null
      }
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
