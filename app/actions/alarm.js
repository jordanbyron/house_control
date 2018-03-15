import * as types from './action_types';

export function setPasscode(passcode) {
  return {
    type: types.SET_PASSCODE,
    passcode: passcode
  };
}

export function update(status) {
  return {
    type: types.ALARM_UPDATE,
    status: status
  };
}

export function connected() {
  return {
    type: types.ALARM_CONNECTED
  };
}

export function error(error) {
  return {
    type: types.ALARM_ERROR,
    error: error
  };
}

