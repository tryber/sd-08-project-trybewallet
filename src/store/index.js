import { createStore } from 'redux';
import reduce from '../reducers';

const store = createStore(reduce);

export default store;
