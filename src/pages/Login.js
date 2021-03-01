import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../actions';
import './login.css';

import Inputmail from '../components/inputmail';
import InputPass from '../components/inputpass';

function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const [disable, setDisable] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const patternEmail = /\S+@\S+\.\S+/;
  // const { Pattern } = Inputmail; //não consegui usar o dado dai
  const PASSLEN = 6;
  const validation = () => {
    const { email, password } = data;
    if (patternEmail.test(email) && password.length >= PASSLEN) {
      return setDisable(false);
    }
    return setDisable(true);
  };
  // usando o nome como chave.
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
    // testar se returna e muda a rota no final
    return history.push('/carteira');
  };
  const { email, password } = data;
  return (
    <div className="campos_login">
      <Inputmail value={ email } onChange={ handleChange } />
      <InputPass value={ password } onChange={ handleChange } />
      <button
        className="login"
        type="button"
        name="login"
        disabled={ disable }
        onClick={ handleJoin }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
