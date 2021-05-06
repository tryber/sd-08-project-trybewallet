import React from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import addUser from '../actions/login';

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

  validation() {
    const { email, password } = this.state;
    const minPasswordSize = 6;
    const regex = /.+@[A-z]+[.]com/;
    const isValidEmail = regex.test(email);
    const isValidPassword = password.length >= minPasswordSize;
    if (isValidPassword && isValidEmail) {
      return false;
    }
    return true;
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { addEmail } = this.props;
    const { email } = this.state;
    addEmail(email);
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
          <input
            type="text"
            name="email"
            data-testid="email-input"
            placeholder="Email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            data-testid="password-input"
            placeholder="Senha"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <button type="submit" disabled={ this.validation() }>
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  addEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addEmail: (email) => dispatch(addUser(email)),
});

export default connect(null, mapDispatchToProps)(Login);
