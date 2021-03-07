export default function getEmail(email) {
  return {
    type: 'GET_LOGIN',
    payload: {
      email,
    },
  };
}
