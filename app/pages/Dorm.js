import React, { PropTypes } from 'react';
import { Paper, Tabs, Tab, RaisedButton } from 'material-ui';

class Dorm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { store } = this.context;
    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
    };
    return (
      <div>
        <Tabs>
          <Tab label="Token">
            <div>
              Token is {store.getState().auth.token}
            </div>
          </Tab>
          <Tab label="Item Two" >
            <div>
              <h2 style={styles.headline}>Tab Two</h2>
              <p>
                This is another example tab.
              </p>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

Dorm.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default Dorm;

