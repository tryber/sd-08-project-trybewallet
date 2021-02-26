const addUser = (payload) => ({
  type: 'LOGIN',
  email: payload.email,
  password: payload.password,
});

export default addUser;
