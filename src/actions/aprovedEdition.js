import { ADD_EDITIONS } from './index';

export default function aprovedEditionAction(handlingInputs, id) {
  return {
    type: ADD_EDITIONS,
    payload: {
      handlingInputs,
      id,
    },
  };
}
