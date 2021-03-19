import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import actionUser from '../../actions/user';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: '',
      password: '',
      shouldRedirect: false,
    };
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  checkValidity() {
    const { email, password } = this.state;
    const passwordLength = 6;
    if (password.length < passwordLength) return false;
    if (!/^[A-Z0-9._-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i.test(email)) return false;
    return true;
    // Usei o regex para validação feito com base em https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    const { saveEmailAndPassword } = this.props;
    saveEmailAndPassword(email, password);
    this.setState({ shouldRedirect: true });
  }

  render() {
    const { shouldRedirect } = this.state;
    if (shouldRedirect) return <Redirect to="/carteira" />;

    return (
      <form onSubmit={ this.handleSubmit } autoComplete="on">
        <input
          data-testid="email-input"
          placeholder="Email"
          name="email"
          id="email"
          type="text"
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          placeholder="Senha"
          name="password"
          id="password"
          type="text"
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          disabled={ !this.checkValidity() }
        >
          Entrar
        </button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  saveEmailAndPassword: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveEmailAndPassword: (email, password) => dispatch(actionUser(email, password)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
