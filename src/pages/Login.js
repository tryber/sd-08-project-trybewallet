import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginBtn: true,
    };

    this.inputOnChange = this.inputOnChange.bind(this);
  }

  inputOnChange({ target: { name, value } }) {
    this.setState({ [name]: value });
    this.loginValidation();
  }

  emailChecker() {
    const { email: emailValue } = this.state;

    const emailFormat = /^[a-z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    let emailCheck = false;
    if (emailValue.match(emailFormat)) {
      emailCheck = true;
    }
    return emailCheck;
  }

  passwordChecker() {
    const { password: passwordValue } = this.state;

    const passwordFormat = /.{5,}/;

    let passwordCheck = false;
    if (passwordValue.match(passwordFormat)) {
      passwordCheck = true;
    }
    return passwordCheck;
  }

  loginValidation() {
    const check1 = this.emailChecker();
    const check2 = this.passwordChecker();

    if (check1 && check2) {
      this.setState({ loginBtn: false });
    } else {
      this.setState({ loginBtn: true });
    }
  }

  loginBtn() {
    const { history, getLogin } = this.props;
    const { email, password } = this.state;

    getLogin(email, password);
    history.push('/carteira');
  }

  render() {
    const { loginBtn } = this.state;
    let btn;
    if (loginBtn) {
      btn = (
        <button
          type="button"
          disabled={ loginBtn }
          onClick={ () => this.loginBtn() }
          style={ { background: 'rgb(235, 212, 12, 0.5)' } }
        >
          Entrar
        </button>
      );
    } else {
      btn = (
        <button
          type="button"
          disabled={ loginBtn }
          onClick={ () => this.loginBtn() }
        >
          Entrar
        </button>
      );
    }

    return (
      <div className="login-container">
        <h1>l o g i n</h1>
        <input
          type="email"
          name="email"
          id="email-input"
          data-testid="email-input"
          placeholder="e m a i l"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3,}$"
          onChange={ this.inputOnChange }
        />
        <input
          type="password"
          name="password"
          id="password-input"
          data-testid="password-input"
          placeholder="p a s s wo r d"
          pattern=".{5,}"
          title="6 or more characters"
          onChange={ this.inputOnChange }
        />
        {btn}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  getLogin: (email, password) => dispatch(login(email, password)),
});

Login.propTypes = {
  getLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
