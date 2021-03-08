// combineReducers auxiliar transforma um objeto cujos valores são diferentes funções de redução em uma única função.
import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

const reducer = combineReducers({ user, wallet });

export default reducer;
