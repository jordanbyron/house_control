import * as types from './action_types';

export function update(status) {
  return {
    type: types.GARAGE_DOOR_UPDATE,
    status: status
  };
}
