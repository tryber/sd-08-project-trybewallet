const INITIAL_STATE = {
    email:'',
}
const user = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
    case 'GET_LOGIN':
      return {
        ...state,
        email: payload.email,
      };
    default:
      return state;
    }
  };
  
  export default user;
  
