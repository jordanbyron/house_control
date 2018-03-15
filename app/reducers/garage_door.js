import * as types from '../actions/action_types';

const initialState = {
  status: 'connecting'
};

export default function garageDoor(state = initialState, action = {}) {
  switch (action.type) {
    case types.GARAGE_DOOR_UPDATE:
      return Object.assign({}, state, {status: action.status});
    case types.ALARM_ERROR:
      return Object.assign({}, state, {status: 'connecting'});
    default:
      return state;
  }
}
