import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import user from '../reducers/user';

const store = createStore(user, composeWithDevTools(applyMiddleware(thunk)));

export default store;
