import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import loginAction from '../actions/loginAction';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
      passwordMinLength: 6,
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkButton = this.checkButton.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.type]: target.value }, this.checkButton);
  }

  checkButton() {
    const { email, password, passwordMinLength } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailCheck = emailRegex.test(email);
    const passwordCheck = password.length >= passwordMinLength;
    if (emailCheck && passwordCheck) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { email, password, isDisabled } = this.state;
    const { login } = this.props;
    return (
      <form>
        <input
          type="email"
          data-testid="email-input"
          value={ email }
          onChange={ this.handleChange }
          placeholder="email"
        />
        <input
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ this.handleChange }
          placeholder="password"
        />
        <Route
          render={ ({ history }) => (
            <button
              type="button"
              disabled={ isDisabled }
              onClick={ () => {
                login(email);
                history.push('/carteira');
              } }
            >
              Entrar
            </button>
          ) }
        />
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
