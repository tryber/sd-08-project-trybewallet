const loginUser = (email) => (
  { type: 'LOGIN_USER', payload: { email } }
);

export default loginUser;
