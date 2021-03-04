import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
    };
  }

  render() {
    const { email, addEmail: adicionaEmail, history: historico } = this.props;
    const { password } = this.state;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
    const passwordMinLength = 6;
    return (
      <div>
        <h1>LOGIN</h1>
        <input
          type="text"
          placeholder="Digite seu E-mail"
          value={ email }
          name="email"
          id="email"
          data-testid="email-input"
          onChange={ ({ target }) => adicionaEmail(target.value) }
        />
        <input
          type="password"
          placeholder="Digite sua Senha"
          value={ password }
          name="password"
          id="password"
          data-testid="password-input"
          onChange={ ({ target }) => this.setState({ password: target.value }) }
        />
        <button
          type="button"
          disabled={ !regexEmail.test(email) || password.length < passwordMinLength }
          onClick={ () => historico.push('/carteira') }
        >
          ENTRAR
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
});
const mapDistpatchToProps = (dispatch) => ({
  addEmail: (emailValue) => dispatch(addEmail(emailValue)),
});

Login.propTypes = {
  email: PropTypes.string.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  addEmail: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDistpatchToProps)(Login);
