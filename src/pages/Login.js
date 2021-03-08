import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logar from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
    this.mudarCampos = this.mudarCampos.bind(this);
    this.validar = this.validar.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  mudarCampos(event) {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => this.validar());
  }

  handleClick(e) {
    e.preventDefault();

    const { handleEmail } = this.props;
    const { email } = this.state;

    handleEmail(email);
  }

  validar() {
    const { email, password } = this.state;
    let disabled = false;
    const emailValido = /^[\w]+@([\w]+\.)+[\w]{2,4}$/gi;
    const tamanho = 6;
    disabled = !(emailValido.test(email) && password.length >= tamanho);
    this.setState({ disabled });
  }

  render() {
    const { email, password, disabled } = this.state;
    return (
      <form>
        <input
          type="text"
          name="email"
          value={ email }
          onChange={ this.mudarCampos }
          data-testid="email-input"
          placeholder="E-mail"
        />
        <input
          type="password"
          name="password"
          value={ password }
          onChange={ this.mudarCampos }
          data-testid="password-input"
          placeholder="Senha"
        />
        <button
          type="submit"
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          <Link to="/carteira">
            Entrar
          </Link>
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleEmail: (email) => dispatch(logar(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  handleEmail: PropTypes.func.isRequired,
};
