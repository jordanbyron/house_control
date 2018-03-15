'use strict';

import React, { Component } from 'react';

var {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
} = require('react-native');

import Svg,{
  G,
  Polygon,
  Rect,
  Text,
} from 'react-native-svg';

const GarageDoor = ({status, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <GarageSvg status={status} />
  </TouchableOpacity>
)

export const GarageSvg = ({status, width, height}) => {
  width  = width || '250';
  height = height || '200';

  let door, fillColor = '#000000';

  if(status == 'closed') {
    door = (<DoorSvg />)
  } else if (status == null || status != 'open') {
    fillColor = '#aaaaaa';

    door = (<Text x="51" y="50" stroke={fillColor} fontWeight="200"
            width="200"
            textAnchor="middle">{status}</Text>)
  }

  return (
    <Svg width={width} height={height} viewBox="0 0 104 78">
      <G fill={fillColor}>
        <Polygon points="52,0.949 0.375,27.032 3.375,30.36 52,5.699 100.625,30.36 103.625,27.032" />
        <Polygon points="52,12.533 6.375,35.334 6.375,77.021 18,77.021 18,35.199 52,35.199 86,35.199 86,77.021 97.625,77.021 97.625,35.334" />
        {door}
      </G>
    </Svg>
  )
}

const DoorSvg = () => (
  <G x="21" y="43">
    <Rect x="1" y="0" width="60.5" height="7.5" />
    <Rect x="1" y="11.167" width="60.5" height="7.5" />
    <Rect x="0.75" y="22.834" width="60.5" height="7.5" />
  </G>
)

export default GarageDoor;
