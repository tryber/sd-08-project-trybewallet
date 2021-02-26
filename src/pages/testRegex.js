function ValidateEmail(mail) {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
    return (true);
  }
  console.log('You have entered an invalid email address!');
  return (false);
}

console.log(ValidateEmail('hugo@mail.com.'));
