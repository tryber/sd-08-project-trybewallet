function login(email) {
  return ({
    type: 'LOGIN',
    email,
  });
}

export default login;
