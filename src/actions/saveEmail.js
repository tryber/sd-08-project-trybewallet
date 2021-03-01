const saveEmail = (email) => console.log(email) || ({
  type: 'SAVE_EMAIL',
  payload: {
    email,
  },
});

export default saveEmail;
