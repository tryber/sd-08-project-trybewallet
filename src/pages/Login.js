import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { adcionarEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      validaEmail: false,
      validaSenha: false,
    };
  }

  handelEmail(e) {
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z_]{2,3}$/;
    // https://forum.blip.ai/t/resolvido-regex-para-validacao-de-email/1635
    this.setState({
      email: e.target.value,
      validaEmail: RegExp(regex).test(e.target.value),
    });
  }

  handelSenha(e) {
    const six = 6;
    this.setState({
      senha: e.target.value,
      validaSenha: e.target.value.length >= six,
    });
  }

  render() {
    const { senha, email, validaEmail, validaSenha } = this.state;
    const { loginDispatch } = this.props;

    return (
      <>
        <label htmlFor="email">
          Email
          <br />
          <input
            id="email"
            name="email"
            placeholder="email@email.com"
            data-testid="email-input"
            value={ email }
            onChange={ (e) => this.handelEmail(e) }
            required
          />
        </label>
        <br />
        <label htmlFor="senha">
          <br />
          Senha
          <br />
          <input
            id="senha"
            name="senha"
            type="password"
            placeholder="**********"
            value={ senha }
            data-testid="password-input"
            onChange={ (e) => this.handelSenha(e) }
            required
          />
        </label>
        <br />
        <br />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ !(validaEmail && validaSenha) }
            onClick={ () => loginDispatch(email) }
          >
            Entrar
          </button>
        </Link>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginDispatch: (e) => dispatch(adcionarEmail(e)),
});

Login.propTypes = {
  loginDispatch: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Login);
