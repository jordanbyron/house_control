import React from 'react';
const timer = require('react-native-timer');
const {
  Text,
  View
} = require('react-native');
const DateHelper = require('../vendor/date_utils');

class LastUpdate extends React.Component {
  componentWillUnmount() {
    timer.clearTimeout(this);
  }
  componentDidMount() {
    timer.setInterval(this, 'forceUpdate', () => {
      this.forceUpdate();
    }, 30000);
  }
  render() {
    const time = this.props.alarm.lastUpdated;

    if(time) {
      return (
        <View style={this.props.style}>
          <Text style={{textAlign: 'center', color: '#aaa'}}>
            updated {DateHelper.time_ago_in_words_with_parsing(time)}
          </Text>
        </View>
      )
    } else {
      return ( <View /> )
    }
  }
}

LastUpdate.defaultProps = {
  time: null
};

export default LastUpdate;
