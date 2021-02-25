const loginAction = (value) => ({
  type: 'LOGIN',
  value: {
    email: value,
  },
});

export default loginAction;
