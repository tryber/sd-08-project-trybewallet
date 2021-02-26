import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../actions';

import InputEmail from '../components/InputEmail';
import InputPassword from '../components/InputPassword';

function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const [disable, setDisable] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const validEmail = /\S+@\S+\.\S+/;
  const PASSLEN = 6;

  const validation = () => {
    const { email, password } = data;
    if (validEmail.test(email) && password.length >= PASSLEN) {
      return setDisable(false);
    }
    return setDisable(true);
  };
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData({
      ...data,
      [name]: value,
    });
  };
  useEffect(() => {
    validation();
  }, [data]);
  const handleJoin = () => {
    const { email } = data;
    dispatch(actions.login(email));
    return history.push('/carteira');
  };
  const { email, password } = data;

  return (
    <main>
      <InputEmail value={email} onChange={handleChange} />
      <InputPassword value={password} onChange={handleChange} />
      <button
        type="button"
        name="login"
        disabled={disable}
        onClick={handleJoin}
      >
        Entrar
      </button>
    </main>
  );
}

export default Login;
