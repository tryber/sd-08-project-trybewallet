import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login as loginAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNotValid: false,
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.validButton = this.validButton.bind(this);
    this.changePageLogin = this.changePageLogin.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => this.validButton());
  }

  changePageLogin() {
    const { history, handleLogin } = this.props;
    const { email } = this.state;
    handleLogin(email);
    history.push('/carteira');
  }

  validButton() {
    const x = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const minPass = 6;
    const { email, password } = this.state;
    // if (password.length >= minPass && x.test(email)) {
    this.setState({ isNotValid: password.length >= minPass && x.test(email) });

    // } else {
    //   this.setState({ isNotValid: true });
    // }
  }

  render() {
    const { email, password, isNotValid } = this.state;
    return (
      <form>
        <div className="Login">
          <section className="login-inputs">
            <input
              type="text"
              onChange={ this.handleChange }
              placeholder="Type your email"
              data-testid="email-input"
              value={ email }
              name="email"
              required
            />
            <input
              type="password"
              onChange={ this.handleChange }
              placeholder="Type your password"
              data-testid="password-input"
              value={ password }
              name="password"
              required
            />
          </section>
          <div className="link">
            <button
              type="button"
              onClick={ this.changePageLogin }
              disabled={ !isNotValid }
              className="btn-login"
              data-testid="btn-login"
            >
              Entrar
            </button>
          </div>
        </div>
      </form>
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
