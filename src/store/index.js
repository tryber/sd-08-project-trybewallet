import { createStore, applyMiddleWare } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleWare(thunk)));

export default store;
