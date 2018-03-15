'use strict';

var React = require('react');
var {
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
  NativeAppEventEmitter,
  TouchableHighlight,
  AlertIOS,
  AsyncStorage,
} = require('react-native');

import * as alarmActions from '../actions/alarm';
import * as garageDoorActions from '../actions/garage_door';
import WatchConnectivity from '../components/watch_connectivity';
import ServerURL from '../config/server_url';
import RNEventSource from 'react-native-event-source';
import GarageDoor from './garage_door';
import LastUpdate from './last_update';

var SlideTo       = require('./slide_to'),
    QuickActions  = require('react-native-quick-actions'),
    WatchManager  = require('../vendor/watch_manager.js'),
    DateHelper    = require('../vendor/date_utils'),
    TimerMixin    = require('react-timer-mixin'),
    subscriptions;

class HouseKeypad extends React.Component {
  constructor(props) {
    super(props);

    this.panic = this.panic.bind(this);
  }
  async componentDidMount() {
    var self = this;
    const { dispatch, AlarmAPI } = this.props;

    if(!this.props.alarm.passcode) {
      const storageKey = this.props.alarm.passcodeStorageKey;
      let passcode = await AsyncStorage.getItem(storageKey);

      if (passcode !== null){
        dispatch(alarmActions.setPasscode(passcode));
      } else {
        this.props.navigator.push({title: 'PasscodeKeypad', index: 1});
      }
    }

    this.eventSource = new RNEventSource(ServerURL + '/stream');

    subscriptions = [
      this.eventSource.addEventListener('status', function(message) {
        var status = JSON.parse(message.data);

        dispatch(alarmActions.update(status));
      }),
      this.eventSource.addEventListener('garage_door', function(message) {
        dispatch(garageDoorActions.update(message.data));
      }),
      this.eventSource.addEventListener('error', function(data) {
        dispatch(alarmActions.error(data.message));
      }),
      this.eventSource.addEventListener('open', function(message) {
        dispatch(alarmActions.connected());
      }),
      DeviceEventEmitter.addListener(
        'quickActionShortcut', self.handleQuickAction)
    ];

    this.handleQuickAction(QuickActions.popInitialAction());

    let response = await AlarmAPI.status();
    let data     = await response.json();

    dispatch(alarmActions.update(data.alarm));
    dispatch(garageDoorActions.update(data.garage_door));
  }
  componentDidUmnount() {
    subscriptions.map((s) => { s.remove(); });
    this.eventSource.close();
  }
  handleQuickAction(data) {
    if(data == null) return false;

    const { AlarmAPI, GarageDoorAPI } = this.props;

    if(data.type == 'com.housecontrol.app.leave'){
      AlarmAPI.away();
      GarageDoorAPI.toggle();
    } else if(data.type == 'com.housecontrol.app.arrive'){
      AlarmAPI.off();
      GarageDoorAPI.toggle();
    }
  }
  panic() {
    this.props.AlarmAPI.panic();
    AlertIOS.alert(
      'Alarm Panic',
      'Hang in there. Everything will be ok'
    );
  }
  render() {
    const { AlarmAPI, GarageDoorAPI } = this.props;

    var alarmDisplay = (
      <View style={this.alarmContainerStyle()}>
        <Text style={this.alarmDisplayStyle()}>
          {this.alarmDisplay()}
        </Text>
      </View>
    );

    var error;

    if(this.props.alarm.error) {
      error = (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {this.props.alarm.error}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <WatchConnectivity AlarmAPI={AlarmAPI} GarageDoorAPI={GarageDoorAPI}
          alarmStatus={this.alarmDisplay()} garageDoorStatus={this.props.garageDoor.status}
          error={this.props.alarm.error} />
        {alarmDisplay}
        <View style={styles.alarmControlsContainer}>
          <TouchableHighlight onPress={() => AlarmAPI.off()}
          underlayColor={'#3071A9'} style={styles.button}>
            <Text style={styles.alarmOff}>Off</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => AlarmAPI.away()}
            underlayColor={'#843534'} style={styles.button}>
            <Text style={styles.alarmDanger}>Away</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => AlarmAPI.stay()}
            underlayColor={'#843534'} style={styles.button}>
            <Text style={styles.alarmDanger}>Stay</Text>
          </TouchableHighlight>
        </View>
        <GarageDoor status={this.props.garageDoor.status}
          onPress={() => this.props.GarageDoorAPI.toggle()} />
        <View style={styles.panic}>
          <SlideTo message={'slide to panic'} callback={this.panic} />
        </View>
        {error}
        <LastUpdate time={this.props.alarm.lastUpdated}
                    style={styles.lastUpdatedContainer}
                    {...this.props } />
      </View>
    );
  }
  alarmContainerStyle() {
    var status  = this.props.alarm.status,
        style = {
          borderRadius: 4,
          backgroundColor: '#eee',
          padding: 15,
          alignItems: 'center',
          width: this.props.deviceWidth - 20,
        };

    if(status){
      if(status.alarm_sounding || status.fire){
        style.backgroundColor = '#d9534f';
      } else if(status.ready) {
        style.backgroundColor = '#3c763d';
      }
    }

    return style;
  }
  alarmDisplayStyle() {
    var status  = this.props.alarm.status,
        style = {
          fontSize: 40,
          color: '#555',
        };

    if(status){
      if(status.alarm_sounding || status.fire || status.ready){
        style.color = '#fff';
      } else if(status.armed_home || status.armed_away) {
        style.color = '#d9534f';
      }
    }

    return style;
  }
  alarmDisplay() {
    var status  = this.props.alarm.status;

    if(status)
      return status.human_status;
    else
      return "Connecting";

  }
  garageDoorContainerStyle() {
    var style = {
      backgroundColor: '#555',
      alignItems: 'center',
      padding: 30,
      borderRadius: 4,
      width: this.props.deviceWidth - 20,
      marginTop: 10,
    }

    if(this.props.garageDoor.status == "open") {
      style.backgroundColor = '#aaa';
      style.borderColor = '#555';
      style.borderWidth = 2;
    }

    return style;
  }
}

HouseKeypad.defaultProps = {
  deviceWidth: require('Dimensions').get('window').width
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: 32,
    padding: 10,
  },
  garageDoorText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
  garageDoorStatus: {
    fontSize: 16,
    marginTop: 10,
  },
  alarmControlsContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 10,
    marginBottom: 40,
  },
  alarmOff: {
    color: '#428BCA',
    padding: 20,
    fontSize: 28,
    textAlign: 'center',
  },
  alarmDanger: {
    color: '#A94442',
    padding: 20,
    fontSize: 28,
    textAlign: 'center',
  },
  button: {
    borderRadius: 4,
  },
  panic: {
    position: 'absolute',
    bottom: 40,
    left: 10,
    right: 10,
  },
  errorContainer: {
    position: 'absolute',
    top: require('Dimensions').get('window').height / 2,
    left: 10,
    right: 10,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    borderRadius: 4,
  },
  errorText: {
    color: '#fff',
    textAlign: 'center',
  },
  lastUpdatedContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    alignItems: 'center',
  }
});

module.exports = HouseKeypad;
