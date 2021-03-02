import { HANDLE_INPUTS } from './index';

export default function handleInputsAction(event) {
  const { target: { name, value } } = event;
  const key = name;
  return {
    type: HANDLE_INPUTS,
    payload: { [key]: value },
  };
}
