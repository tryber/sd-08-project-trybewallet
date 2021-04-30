import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import userEmail from '../actions/user.action';
import InputEmail from '../components/login/InputEmail';
import InputSenha from '../components/login/InputSenha';

function Login({ loginDispatch }) {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();
  const MIN_LENGTH = 6;

  function isValid() {
    const { email, password } = login;
    let validation = true;
    const emailValid = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    validation = !(emailValid.test(email) && password.length >= MIN_LENGTH);
    setIsDisabled(validation);
  }

  useEffect(() => {
    isValid();
  }, [login]);

  function handleChange({ target: { value, name } }) {
    setLogin({
      ...login,
      [name]: value,
    });
  }

  function handleClick() {
    const { email } = login;
    loginDispatch(email);
    history.push('/carteira');
  }

  return (
    <form>
      <InputEmail handleChange={ handleChange } value={ login } />
      <InputSenha onChange={ handleChange } value={ login.password } />
      <button
        type="button"
        disabled={ isDisabled }
        onClick={ handleClick }
      >
        Entrar
      </button>
    </form>
  );
}

Login.propTypes = {
  loginDispatch: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  loginDispatch: (email) => dispatch(userEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
