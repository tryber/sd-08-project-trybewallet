import { createActions } from '../libs/reduxsauce';

export const { Types, Creators } = createActions({
  saveEmail: ['email'],
});
