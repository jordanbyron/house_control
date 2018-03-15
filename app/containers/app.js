import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { View } from 'react-native';

import * as reducers from '../reducers';
import HouseControlApp from './houseControlApp';

const reducer = combineReducers(reducers);
const store   = createStore(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HouseControlApp />
      </Provider>
    );
  }
}
