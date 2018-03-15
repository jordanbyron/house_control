import React, { Component } from 'react';
import { View } from 'react-native';

import WatchManager from '../vendor/watch_manager';

class WatchConnectivity extends Component {
  componentDidMount() {
    const { GarageDoorAPI, AlarmAPI } = this.props;

    // WatchManager.activate();

    // this.subscription = WatchManager.addMessageListener((message) => {
    //   if(message.garageDoor) {
    //     GarageDoorAPI.toggle();
    //   } else if(message.alarm) {
    //     switch(message.alarm) {
    //       case "off":
    //         AlarmAPI.off();
    //         break;
    //       case "away":
    //         AlarmAPI.away();
    //         break;
    //       case "stay":
    //         AlarmAPI.stay();
    //         break;
    //     }
    //   } else if(message.update) {
    //     AlarmAPI.status().then(function(response) {
    //       response.json().then(function(data) {
    //         WatchManager.sendMessage({
    //           garageDoor: data.garage_door,
    //           alarmDisplay: data.alarm.human_status});
    //       });
    //     });
    //   }
    // }, this);
  }
  componentDidUmnount() {
    // WatchManager.removeMessageListener(this.subscription);
  }
  shouldComponentUpdate(nextProps, nextState) {
    let changes = {};

    if(nextProps.error != this.props.error) {
      changes.error = nextProps.error;
    }

    if(nextProps.alarmStatus != this.props.alarmStatus) {
      changes.alarmDisplay = nextProps.alarmStatus;
    }

    if(nextProps.garageDoorStatus != this.props.garageDoorStatus) {
      changes.garageDoor = nextProps.garageDoorStatus;
    }

    if(Object.keys(changes).length > 0) {
      // WatchManager.sendMessage(changes);
    }

    return false;
  }
  render () {
    return (<View />)
  }
}

export default WatchConnectivity;
