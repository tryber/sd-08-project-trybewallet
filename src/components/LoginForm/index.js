import React from 'react';
import { connect } from 'react-redux';
import { string, func, bool } from 'prop-types';
import { Link } from 'react-router-dom';
import { loginAction } from '../../actions';

import './LoginForm.css';

class FormLogin extends React.Component {
  renderInputEmail(email, handleInputChange) {
    return (
      <div className="content-login-email">
        <input
          className="input-email"
          placeholder="E-mail"
          value={ email }
          onChange={ handleInputChange }
          name="email"
          required
          data-testid="email-input"
          type="email"
        />
      </div>
    );
  }

  renderInputPassword(password, handleInputChange) {
    return (
      <div className="content-login-password">
        <input
          className="input-password"
          placeholder="Senha"
          onChange={ handleInputChange }
          value={ password }
          name="password"
          required
          data-testid="password-input"
          type="password"
        />
      </div>
    );
  }

  renderButtonEnter(disabledBtn, email) {
    const user = { email };
    const { saveEmail: getEmail } = this.props;
    return (
      <div className="content-login-button">
        <Link to="/carteira">
          <button
            className={ !disabledBtn ? 'login-button-btn' : '' }
            disabled={ disabledBtn }
            onClick={ () => getEmail(user) }
            type="button"
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }

  render() {
    const {
      email,
      password,
      disabledBtn,
      handleInputChange,
    } = this.props;
    return (
      <form className="form-login-content" onSubmit={ (event) => event.preventDefault() }>
        {this.renderInputEmail(email, handleInputChange)}
        {this.renderInputPassword(password, handleInputChange)}
        {this.renderButtonEnter(disabledBtn, email)}
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(loginAction(email)),
});

FormLogin.propTypes = {
  email: string.isRequired,
  password: string.isRequired,
  disabledBtn: bool.isRequired,
  handleInputChange: func.isRequired,
  saveEmail: func.isRequired,
};

export default connect(null, mapDispatchToProps)(FormLogin);
