import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Creators as UserActions } from '../actions/user';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      shouldRedirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  validator() {
    const { email, password } = this.state;
    const MIN_PASSWORD_LENGTH = 6;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return false;
    if (password.length < MIN_PASSWORD_LENGTH) return false;
    return true;
  }

  handleSubmit(event) {
    event.preventDefault();
    const { saveEmail } = this.props;
    const { email } = this.state;
    saveEmail(email);
    this.setState({ shouldRedirect: true });
  }

  render() {
    const { email, password, shouldRedirect } = this.state;

    if (shouldRedirect) return <Redirect to="/carteira" />;

    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          type="text"
          name="email"
          value={ email }
          data-testid="email-input"
          placeholder="Email"
          onChange={ this.handleChange }
        />
        <input
          type="password"
          name="password"
          value={ password }
          data-testid="password-input"
          placeholder="Senhas"
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          disabled={ !this.validator() }
        >
          Entrar
        </button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  saveEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(UserActions.saveEmail(email)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
