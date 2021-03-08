import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.loginValidation = this.loginValidation.bind(this);
    this.state = {
      email: '',
      password: '',
      disabled: true,
      shouldRedirect: false,
    };
  }

  validateEmail(email) {
    const re = new RegExp('^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)'
    + '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])'
    + '|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
    return re.test(String(email).toLowerCase());
  }
  // source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript

  loginValidation() {
    const { email, password } = this.state;
    const MINIMUM_CHARACTERS = 6;
    if (
      this.validateEmail(email)
      && password.length >= MINIMUM_CHARACTERS) {
      return false;
    }
    return true;
  }

  handleChange({ target: { value, type } }) {
    this.setState({
      [type]: value,
    }, () => {
      this.setState({
        disabled: this.loginValidation(),
      });
    });
  }

  storeEmail() {
    const { email } = this.state;
    const { login } = this.props;
    login(email);
    this.setState({ shouldRedirect: true });
  }

  render() {
    const { email, password, disabled, shouldRedirect } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/carteira" />;
    }
    return (
      <div>
        <label htmlFor="email">
          Seu email:
          <input
            id="email"
            type="email"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Sua senha:
          <input
            id="password"
            type="password"
            data-testid="password-input"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ disabled }
          onClick={ () => this.storeEmail() }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
