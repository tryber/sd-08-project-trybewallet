// Coloque aqui suas actions

const verifyLogin = (data) => ({
  type: 'VERIFY_LOGIN',
  payload: {
    email: data,
  },
});

export default verifyLogin;
