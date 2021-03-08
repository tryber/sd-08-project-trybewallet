import { USER } from './index';

export const actionUser = (email) => ({ type: USER, payload: { email } });
