import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { emailChange } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
      login: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.loginValidation = this.loginValidation.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    const { handleEmail } = this.props;
    const { email } = this.state;

    this.setState({ login: true });

    handleEmail(email);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    }, () => {
      this.loginValidation();
    });
  }
  loginValidation() {
    const { email, password } = this.state;
    let disabled = false;
    const EMAIL_VALIDATION = /^[\w]+@([\w]+\.)+[\w]{2,4}$/gi;
    const MIN_PASSWORD_LENGTH = 6;
    disabled = !(EMAIL_VALIDATION.test(email) && password.length >= MIN_PASSWORD_LENGTH);
    this.setState({ disabled });
  }

  render() {
    const { email, password, disabled, login } = this.state;
    return (
      <form>
        <input
          type="text"
          name="email"
          value={email}
          onChange={this.handleChange}
          data-testid="email-input"
          placeholder="user@email.com"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={this.handleChange}
          data-testid="password-input"
          placeholder="******"
        />
        <button
          type="submit"
          disabled={disabled}
          onClick={this.handleClick}
        >
          Entrar
        </button>
        { login ? <Redirect to="/carteira" /> : ''}
      </form>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  handleEmail: (payload) => dispatch(emailChange(payload)),
});
export default connect(null, mapDispatchToProps)(Login);
Login.propTypes = {
  handleEmail: PropTypes.func.isRequired,
};