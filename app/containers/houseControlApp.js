'use strict';

import React, { Component } from 'react';
import {
  AppRegistry, StyleSheet, AsyncStorage, View, Text
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
// import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import AlarmAPI from '../api/alarm';
import GarageDoorAPI from '../api/garage_door';
import { setPasscode } from '../actions/alarm.js';
import * as appViews from '../components';

class HouseControlApp extends Component {
  componentWillUpdate(nextProps, nextState) {
    if(nextProps.alarm.passcode != this.props.alarm.passcode) {
      AlarmAPI.setPasscode(nextProps.alarm.passcode);
    }
  }
  renderRoute(route, navigator) {
    switch(route.title) {
      case 'PasscodeKeypad':
        return (<appViews.PasscodeKeypad {...this.props} navigator={navigator} />);
        break;
      case 'HouseKeypad':
        return (<appViews.HouseKeypad {...this.props} AlarmAPI={AlarmAPI}
                GarageDoorAPI={GarageDoorAPI} navigator={navigator} />);
        break;
    }
  }
  render() {
    return (
      <Navigator
        initialRoute={{title: 'HouseKeypad', index: 0}}
        renderScene={this.renderRoute.bind(this)}
        style={styles.navContainer}
      />
    );
  }
}

var styles = {
  navContainer: {
    flex: 1,
    backgroundColor: 'white',
  }
};

export default connect(state => state)(HouseControlApp);
