const USER_INFO = 'USER_INFO';

const userInfo = (email) => ({
  type: USER_INFO,
  email,
});

export default userInfo;
