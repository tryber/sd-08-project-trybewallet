import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isChecked: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.emailValidation = this.emailValidation.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState((state) => ({ ...state, [name]: value }),
      () => this.emailValidation());
  }

  handleClick() {
    const { email } = this.state;
    const { walletLogin } = this.props;
    walletLogin(email);
  }

  emailValidation() {
    const { email, password } = this.state;
    const regexEmail = new RegExp('[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$', 'gm');
    const passwordLength = 6;
    const checkedEmail = regexEmail.test(email);
    const checkedPassword = password.length >= passwordLength;

    if (checkedEmail && checkedPassword) {
      return this.setState((state) => ({
        ...state, isChecked: true,
      }));
    }
    this.setState((state) => ({
      ...state, isChecked: false,
    }));
  }

  render() {
    const { email, password, isChecked } = this.state;
    const { emailValidation } = this.props;
    if (emailValidation) return <Redirect to="/carreira" />;
    return (
      <div className="Login">
        <header className="headerLogin">Faça seu Login</header>
        <section className="login-inputs">
          <input
            type="text"
            name="email"
            value={ email }
            placeholder="email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
          <input
            type="password"
            placeholder="senha"
            name="password"
            value={ password }
            data-testid="password-input"
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            disabled={ !isChecked }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailValidation: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  loginWallet: (email) => dispatch(login(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  walletLogin: PropTypes.func.isRequired,
  emailValidation: PropTypes.string.isRequired,
};
