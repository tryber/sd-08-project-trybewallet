import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login as loginAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNotValid: true,
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.validButton = this.validButton.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => this.validButton());
  }

  handleLogin() {
    const { history } = this.props;
    history.push('/carteira');
  }

  validButton() {
    const { email, password } = this.state;
    const { handleLogin } = this.props;
    if (email.length > 0 && password.length > 0) {
      this.setState({ isNotValid: false });
      handleLogin({ email, password });
    }
  }

  render() {
    const { email, password, isNotValid } = this.state;
    return (
      <div className="Login">
        <section className="login-inputs">
          <input
            type="email"
            onChange={ this.handleChange }
            placeholder="Type your email"
            data-testid="email-input"
            value={ email }
            required
          />
          <input
            type="password"
            onChange={ this.handleChange }
            placeholder="Type your password"
            data-testid="password-input"
            minLength="6"
            value={ password }
            required
          />
        </section>
        <div className="link">
          <button
            type="button"
            onClick={ this.handleLogin }
            disabled={ isNotValid }
            className="btn-login"
            data-testid="btn-login"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (value) => dispatch(loginAction(value)),
});

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
