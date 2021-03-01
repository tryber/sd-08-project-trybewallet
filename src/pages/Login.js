import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Creators as userActions } from '../actions';

class Login extends React.Component {
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
    this.setState({
      [name]: value,
    });
  }

  validateInputs() {
    const { email, password } = this.state;
    const passwordMinLength = 6;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return false;
    if (password.length < passwordMinLength) return false;
    return true;
  }

  handleSubmit(event) {
    event.preventDefault();
    const { saveEmail } = this.props;
    const { email } = this.state;
    saveEmail(email);
    this.setState({
      shouldRedirect: true,
    });
  }

  render() {
    const { email, password, shouldRedirect } = this.state;
    if (shouldRedirect) return <Redirect to="/carteira" />;
    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            placeholder="Email"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ this.handleChange }
            placeholder="Senha"
          />
        </label>
        <button type="submit" disabled={ !this.validateInputs() }>
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(userActions.saveEmail(email)),
});

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
