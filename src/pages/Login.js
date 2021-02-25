import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login as loginAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      enableSubmit: false,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.setState(({ email, password }) => ({
        enableSubmit: /.+@.+\.com/.test(email) && (/.{6,}/.test(password)),
      }));
    });
  }

  submit(e) {
    e.preventDefault();
    const { email } = this.state;
    const { login } = this.props;
    login(email);
    this.setState({ redirect: true });
  }

  render() {
    const { email, password, enableSubmit, redirect } = this.state;

    if (redirect) return <Redirect to="/carteira" />;
    return (
      <form onSubmit={ this.submit }>
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
        <button type="submit" disabled={ !enableSubmit }>Entrar</button>
      </form>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(loginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
