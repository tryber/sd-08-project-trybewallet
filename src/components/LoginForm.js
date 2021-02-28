import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import updateEmailAction from '../actions';

const { useState } = React;

const passwordInput = (onChange) => (
  <input
    type="password"
    data-testid="password-input"
    placeholder="Senha"
    pattern="^\S{6,}$"
    required
    onChange={ onChange }
  />
);

const LoginForm = ({ updateEmail }) => {
  const [disabled, setDisabled] = useState(true);
  const [validate, setValidate] = useState({
    email: { isValid: false, value: '' },
    password: { isValid: false, value: '' },
  });
  const history = useHistory();

  const handleChange = ({ target }) => {
    const type = target.getAttribute('type');
    if (target.checkValidity()) {
      setValidate({ ...validate, [type]: { isValid: true, value: target.value } });
    } else {
      setValidate({ ...validate, [type]: { isValid: false, value: target.value } });
    }
  };

  useEffect(() => {
    const valiValues = Object.values(validate);
    if (valiValues.every((value) => value.isValid)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [validate]);

  const handleClick = () => {
    updateEmail(validate.email.value);
    history.push('/carteira');
  };

  return (
    <form className="login-form">
      <input
        type="email"
        data-testid="email-input"
        placeholder="Email"
        pattern="^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$"
        required
        onChange={ handleChange }
        value={ validate.email.value }
      />
      { passwordInput(handleChange) }
      <Button type="button" disabled={ disabled } onClick={ handleClick }>
        Entrar
      </Button>
    </form>
  );
};

const mapDispatch = (dispatch) => ({
  updateEmail: (email) => dispatch(updateEmailAction(email)),
});

LoginForm.propTypes = {
  updateEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatch)(LoginForm);
