import React, { useState } from 'react';
import InputEmail from './components/InputEmail';
import InputPassword from './components/InputPassword';
import SubmitForm from './components/SubmitForm';

export default function LoginForm() {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  return (
    <>
      <InputEmail state={ state } setState={ setState } />
      <InputPassword state={ state } setState={ setState } />
      <SubmitForm state={ state } />
    </>
  );
}
