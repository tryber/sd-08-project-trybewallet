import { createStore } from 'redux';
import user from '../reducers/user';

const store = createStore(user);

export default store;
