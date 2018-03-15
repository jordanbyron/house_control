import * as types from '../actions/action_types';

const initialState = {
  status: null,
  passcode: null,
  error: null,
  lastUpdated: null,
  passcodeStorageKey: 'HouseControlApp:passcode',
};

export default function alarm(state = initialState, action = {}) {
  switch (action.type) {
    case types.ALARM_UPDATE:
      return Object.assign({}, state, {
        status: action.status, lastUpdated: new Date()
    });
    case types.ALARM_CONNECTED:
      return Object.assign({}, state, {error: null, lastUpdated: new Date()});
    case types.ALARM_ERROR:
      return Object.assign({}, state, {status: null, error: action.error});
    case types.SET_PASSCODE:
      return Object.assign({}, state, { passcode: action.passcode });
    default:
      return state;
  }
}
