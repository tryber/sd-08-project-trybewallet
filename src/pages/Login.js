import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      buttonValidation: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginValidation = this.loginValidation.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  loginValidation() {
    const { email, password } = this.state;
    const passwordMinLength = 6;

    if (/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)
    && password.length >= passwordMinLength) return false;
    return true;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { changeEmail } = this.props;
    const { email } = this.state;
    changeEmail(email);
    this.setState({
      buttonValidation: true,
    });
  }

  render() {
    const { buttonValidation, email, password } = this.state;
    if (buttonValidation) return <Redirect to="/carteira" />;
    return (
      <form>
        <input
          placeholder="E-mail"
          data-testid="email-input"
          name="email"
          value={ email }
          type="email"
          onChange={ this.handleChange }
        />
        <input
          placeholder="Password"
          data-testid="password-input"
          name="password"
          value={ password }
          type="text"
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          disabled={ this.loginValidation() }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeEmail: (email) => dispatch({ type: 'CHANGE_EMAIL', email }),
});

Login.propTypes = {
  changeEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
