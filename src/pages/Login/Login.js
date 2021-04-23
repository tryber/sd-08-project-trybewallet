import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import handleEmail from '../../actions/handleEmail.action';

function Login({ emailDispatch }) {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const numberMagic = 5;

  function handleUserEmail(evt) {
    setUserEmail(evt.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  return (
    <form
      onSubmit={ (e) => {
        e.preventDefault(); emailDispatch(userEmail); setRedirect(true);
      } }
    >
      <input
        data-testid="email-input"
        type="email"
        placeholder="name@example.com"
        label="Email"
        value={ userEmail }
        onChange={ handleUserEmail }
      />
      <input
        data-testid="password-input"
        type="password"
        placeholder="atleast 6 characters"
        label="Password"
        value={ password }
        onChange={ handlePassword }
      />
      <input
        type="submit"
        value="Entrar"
        disabled={
          !/^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(userEmail)
          || password.length <= numberMagic
        }
      />
      { redirect ? <Redirect to="/carteira" /> : '' }
    </form>
  );
}

Login.propTypes = {
  emailDispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  emailDispatch: (email) => dispatch(handleEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
