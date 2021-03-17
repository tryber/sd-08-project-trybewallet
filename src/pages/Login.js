import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { addUser as addUserAction } from '../actions';
import walletImg from '../images/wallet.png';
import emailImg from '../images/email.png';
import keyImg from '../images/key.png';

const PASSWORD_LENGTH = 5;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      validUser: false,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.buttonControl = this.buttonControl.bind(this);
    this.redirectPage = this.redirectPage.bind(this);
  }

  buttonControl() {
    const { email, password, validUser } = this.state;
    const isEmail = this.validateEmail(email);
    if (!validUser && isEmail && password.length >= PASSWORD_LENGTH) {
      this.verifyLogin(true);
    } else
    if (validUser && (!isEmail || password.length < PASSWORD_LENGTH)) {
      this.verifyLogin(false);
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.buttonControl());
  }

  verifyLogin(login) {
    this.setState({
      validUser: login,
    });
  }

  redirectPage() {
    this.setState({
      redirect: true,
    });
  }

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  render() {
    const { email, password, validUser, redirect } = this.state;
    const { addUser } = this.props;
    if (redirect) {
      return <Redirect push to="/carteira" />;
    }

    return (
      <div className="login-container">
        <div className="login-box center">
          <img className="wallet-img" src={ walletImg } alt="imagem de carteira" />
          <div className="center">
            <img className="logos" src={ emailImg } alt="logo do email" />
            <input
              type="text"
              name="email"
              data-testid="email-input"
              inputValue={ email }
              onChange={ this.handleChange }
            />
          </div>
          <div className="center">
            <img className="logos" src={ keyImg } alt="logo da senha" />
            <input
              type="password"
              name="password"
              data-testid="password-input"
              inputValue={ password }
              onChange={ this.handleChange }
            />
          </div>
          <button
            className="button"
            type="button"
            onClick={ () => this.redirectPage() || addUser(email, password) }
            disabled={ !validUser }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  addUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addUser: (email, password) => dispatch(addUserAction(email, password)),
});

export default connect(null, mapDispatchToProps)(Login);
