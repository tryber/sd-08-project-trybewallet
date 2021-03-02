import { IS_LOGGED } from './index';

export default function isLoggedAction() {
  return {
    type: IS_LOGGED,
    payload: {
      isLogged: true,
    },
  };
}
