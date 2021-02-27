import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { emailAdd } from '../actions/index';

const minPassword = 5;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validEmail: true,
      validPasswrd: true,
    };
  }

  handleChangeEmail(e) {
    this.setState({
      email: e.target.value,
      validEmail: !/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(e.target.value),
    });
  }

  handleChangePassword(e) {
    this.setState({
      password: e.target.value,
      validPasswrd: (e.target.value.length <= minPassword),
    });
  }

  render() {
    const { email, password, validEmail, validPasswrd } = this.state;
    const { emailFunc, login } = this.props;
    if (login !== '') {
      return <Redirect to="/carteira" />;
    }
    return (
      <div className="login-container">

        <input
          data-testid="email-input"
          name="email"
          onChange={ this.handleChangeEmail.bind(this) }
          value={ email }
          placeholder="Digite seu Email"
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          onChange={ this.handleChangePassword.bind(this) }
          value={ password }
          id="password"
          placeholder="Digite sua Senha"
        />
        <button
          type="button"
          onClick={ () => emailFunc(email) }
          disabled={ validEmail || validPasswrd }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  emailFunc: PropTypes.func.isRequired,
  login: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({ login: state.user.email });
const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ emailFunc: emailAdd }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
