import React, { PropTypes } from 'react';
import { Paper, RaisedButton, FlatButton, AutoComplete, TextField } from 'material-ui';

class ProfileEditor extends React.Component {
  render() {
    const formStyle = {
      maxWidth: 600,
      margin: '50px auto',
      padding: '0 25px 25px'
    }
    const departments = [
      '資訊工程學系',
      '機械系',
      '外文系',
      '資訊工程學系',
      '機械系',
      '外文系',
      '資訊工程學系',
      '機械系',
      '外文系',
      '資訊工程學系',
      '機械系',
      '外文系',
    ];
    return (
      <Paper style={formStyle}>
        <TextField fullWidth={true} floatingLabelText="姓名 (非公開)" />
        <TextField fullWidth={true} floatingLabelText="暱稱" />
        <AutoComplete
          fullWidth={true}
          floatingLabelText="學系"
          listStyle={{ maxHeight: 300 }}
          filter={AutoComplete.fuzzyFilter}
          openOnFocus={true}
          dataSource={departments}
          />
        <TextField fullWidth={true} floatingLabelText="學號" />
        <TextField fullWidth={true} floatingLabelText="房間" />
        <TextField fullWidth={true} floatingLabelText="e-mail" />
        <TextField fullWidth={true} floatingLabelText="facebook" />
        <TextField fullWidth={true} floatingLabelText="標語" />
        <TextField
          fullWidth={true}
          multiLine={true}
          rows={2}
          floatingLabelText="自我介紹" />
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <RaisedButton primary={true} label="儲存" />
        </div>
      </Paper>
    );
  }
}

export { ProfileEditor };
