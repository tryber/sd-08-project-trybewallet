import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userEmailAction, userPasswordAction } from '../actions';
import ValidateLogin from './ValidateLogin';

class LoginForm extends React.Component {
  render() {
    const { userEmail, userPassword } = this.props;
    const img = 'https://go.betrybe.com/hs-fs/hubfs/logo%20cortada.png?width=603&name=logo%20cortada.png';
    return (
      <>
        <h1>
          Try
          <strong>
            -nottospend-
          </strong>
          beWallet
        </h1>
        <img src={ img } alt="Trybe-Logo" />
        <fieldset>
          <form>
            <label htmlFor="email-input">
              Email:
              <input
                id="email-input"
                type="email"
                data-testid="email-input"
                placeholder="Taca teu e-mail"
                onChange={ (value) => userEmail(value) }
              />
            </label>
            <label htmlFor="password-input">
              Senha:
              <input
                id="password-input"
                type="password"
                data-testid="password-input"
                placeholder="Eu guardo segredos! Prometo"
                onChange={ (value) => userPassword(value) }
              />
            </label>
            <ValidateLogin />
          </form>
        </fieldset>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userEmail: (value) => dispatch(userEmailAction(value)),
  userPassword: (value) => dispatch(userPasswordAction(value)),
});

LoginForm.propTypes = {
  userEmail: PropTypes.func.isRequired,
  userPassword: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(LoginForm);
