import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { user } from '../../actions';
import './style.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isValidated: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState(
      (state) => ({ ...state, [name]: value }),
      () => this.validateEmail(),
    );
  }

  handleClick() {
    const { email } = this.state;
    const { loginWallet } = this.props;
    loginWallet(email);
  }

  validateEmail() {
    const { email, password } = this.state;
    const regex = new RegExp('[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$', 'gm');
    const passwordLength = 6;
    const chackedEmail = regex.test(email);
    const checkedPassword = password.length >= passwordLength;

    if (chackedEmail && checkedPassword) {
      return this.setState((state) => ({
        ...state,
        isValidated: true,
      }));
    }
    this.setState((state) => ({
      ...state,
      isValidated: false,
    }));
  }

  render() {
    const { email, password, isValidated } = this.state;
    const { isLogin } = this.props;

    if (isLogin) return <Redirect to="/carteira" />;

    return (
      <div className="loginConteiner">
        <input
          placeholder="Digite seu email"
          type="email"
          name="email"
          id="email"
          data-testid="email-input"
          onChange={ this.handleChange }
          value={ email }
        />
        <input
          placeholder="Senha"
          type="password"
          name="password"
          id="password"
          data-testid="password-input"
          onChange={ this.handleChange }
          value={ password }
        />

        <button type="button" disabled={ !isValidated } onClick={ this.handleClick }>
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  loginWallet: PropTypes.func.isRequired,
  isLogin: PropTypes.string.isRequired,

};

const mapStateToProps = ({ user: { email } }) => ({
  isLogin: email,
});

const mapDispatchToProps = (dispatch) => ({
  loginWallet: (email) => dispatch(user.login(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
