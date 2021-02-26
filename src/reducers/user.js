// Esse reducer será responsável por tratar as informações da pessoa usuária
import { GET_USER_EMAIL, DISABLE_BUTTON } from "../actions/constants";

const INITIAL_STATE = {
  email: "",
  disableButton: true,
};

export default function UserInfo(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER_EMAIL:
      return { ...state, email: action.get_User_Email };
      case DISABLE_BUTTON:
        return { ...state, disableButton: state.disableButton ? false: true} ;
    default:
      return state;
  }
}
