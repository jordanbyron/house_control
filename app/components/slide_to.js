'use strict';

var React = require('react');
var {
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
} = require('react-native');


var CIRCLE_SIZE = 60;
var CIRCLE_COLOR = '#C2181E';
var CIRCLE_HIGHLIGHT_COLOR = '#740D10';
var DEVICE_WIDTH = require('Dimensions').get('window').width;

var DEFAULT_LEFT = 3;
var MAX_LEFT = DEVICE_WIDTH - CIRCLE_SIZE - 26;

class SlideTo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      panX: new Animated.Value(0),
    };

    this._panResponder = {};
    this._previousLeft = 0;
    this._circleStyles = {};
    this.circle = (null : ?{ setNativeProps(props: Object): void });
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: this._highlight,
      onPanResponderMove: (e, { dx, }) => {
        this.state.panX.setValue(dx);
      },
      onPanResponderRelease: (e, { dx, }) => {
        if (dx >= MAX_LEFT) {
          this._fireCallback();
        }

        Animated.spring(this.state.panX, {
          toValue: DEFAULT_LEFT,
          friction: 10,
          tension: 100,
        }).start(() => { this._unHighlight() });
      },
    });
  }

  render() {
    var left = this.state.panX.interpolate({
      inputRange: [0, MAX_LEFT], outputRange: [DEFAULT_LEFT, MAX_LEFT],
      extrapolate: 'clamp'
    });

    return (
      <Animated.View
        style={styles.container}>
        <Text style={styles.message}>
          {this.props.message}
        </Text>
        <Animated.View ref={(circle) => { this.circle = circle; }}
          style={[styles.circle, {left}]}
          {...this._panResponder.panHandlers}
        />
      </Animated.View>
    );
  }

  _highlight() {
    this.circle && this.circle.setNativeProps({
      backgroundColor: CIRCLE_HIGHLIGHT_COLOR
    });
  }

  _unHighlight() {
    this.circle && this.circle.setNativeProps({
      backgroundColor: CIRCLE_COLOR
    });
  }

  _fireCallback() {
    if(this.props.callback !== undefined) this.props.callback();
  }
}

var styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: CIRCLE_COLOR,
    position: 'absolute',
    left: 0,
    top: 3,
  },
  container: {
    height: CIRCLE_SIZE + 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#888',
    borderWidth: 2,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#eee',
    width: DEVICE_WIDTH - 20
  },
  message: {
    position: 'absolute',
    top: 21,
    left: CIRCLE_SIZE + 60,
    right: 0,
    color: '#aaa',
    fontSize: CIRCLE_SIZE - 40
  }
});

module.exports = SlideTo;
