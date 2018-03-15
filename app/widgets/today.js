import React, { Component } from 'react';
import {
  AppRegistry, StyleSheet, View, Text
} from 'react-native';

import AlarmAPI from '../api/alarm';
import { GarageSvg } from '../components/garage_door';

export default class TodayWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {alarm: 'Connecting', garageDoor: 'Connecting',
                  alarmStatus: null};
  }
  async componentDidMount() {
    let response = await AlarmAPI.status();
    let data     = await response.json();

    this.setState({
      alarm: data.alarm.human_status,
      alarmStatus: data.alarm,
      garageDoor: data.garage_door
    });
  }
  alarmDisplayStyle() {
    var status  = this.state.alarmStatus,
        style = {
          fontSize: 20,
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
  alarmContainerStyle() {
    var status  = this.state.alarmStatus,
        style = {
          borderRadius: 4,
          backgroundColor: '#eee',
          padding: 15,
          alignItems: 'center',
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
  render() {
    return (
      <View style={styles.container}>
        <View style={this.alarmContainerStyle.bind(this)()}>
          <Text style={this.alarmDisplayStyle.bind(this)()}>
            {this.state.alarm}
          </Text>
        </View>
        <GarageSvg status={this.state.garageDoor} width={75} height={60} />
      </View>
    );
  }

  // <Text style={styles.welcome}>
  //   Garage: {this.state.garageDoor}
  // </Text>
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

AppRegistry.registerComponent('TodayWidget', () => TodayWidget);
