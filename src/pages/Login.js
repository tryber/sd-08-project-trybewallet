import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { emailChange } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.loginValidation = this.loginValidation.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const { handleEmail } = this.props;
    const { email } = this.state;
    handleEmail(email);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.loginValidation();
    });
  }

  loginValidation() {
    const { email, password } = this.state;
    let disabled = false;
    const emailValidation = /^[\w]+@([\w]+\.)+[\w]{2,4}$/gi;
    const passwordLength = 6;
    disabled = !(emailValidation.test(email) && password.length >= passwordLength);
    this.setState({ disabled });
  }

  render() {
    const { email, password, disabled } = this.state;
    return (
      <form>
        <label htmlFor="email-input">
          Email
          <input
            type="email"
            data-testid="email-input"
            id="email-input"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password-input">
          Senha
          <input
            type="password"
            data-testid="password-input"
            id="password-input"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          <Link to="/carteira">
            Entrar
          </Link>
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  handleEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  handleEmail: (payload) => dispatch(emailChange(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
