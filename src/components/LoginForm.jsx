import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../styles/Global.css';

import { userEmailAction, userPasswordAction } from '../actions';

import ValidateComponent from './ValidateComponent';

class LoginForm extends React.Component {
  render() {
    const { userEmail, userPassword } = this.props;

    return (
      <ruani>
        <h1>Carteira Eletrônica | Ruâni Filipe</h1>
        <img src="https://media.istockphoto.com/vectors/electronic-wallet-technology-icon-vector-id957079510?s=612x612" alt="Logo Carteira Eletrônica" />
        <fieldset>
          <form className="form">
            <label htmlFor="email-input">
              Email:
              <input
                className="input-email"
                type="email"
                data-testid="email-input"
                id="email-input"
                placeholder="Digite seu email"
                onChange={ (value) => userEmail(value) }
              />
            </label>
            <label htmlFor="password-input">
              Senha:
              <input
                className="input-password"
                type="password"
                data-testid="password-input"
                id="password-input"
                placeholder="Digite aqui sua senha"
                onChange={ (value) => userPassword(value) }
              />
            </label>
            <ValidateComponent />
          </form>
        </fieldset>
      </ruani>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userEmail: (value) => dispatch(userEmailAction(value)),
  userPassword: (value) => dispatch(userPasswordAction(value)),
});

export default connect(null, mapDispatchToProps)(LoginForm);

LoginForm.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userPassword: PropTypes.string.isRequired,
};
