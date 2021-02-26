import { GET_USER_EMAIL, DISABLE_BUTTON } from './constants'

export const getUserEmail = (get_User_Email) => ({ type: GET_USER_EMAIL, get_User_Email });
export const disableButton = () => ({ type: DISABLE_BUTTON });

