import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { // estado inicial do component, login
      email: '',
      password: '',
      btnEnable: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) { // acionada no uso dos inputs
    const { name, value } = event.target;
    this.setState({ // mudança de estado é com a this.setState
      [name]: value,
    }, () => {
      const { email, password } = this.state;
      if (this.validEmail(email) && this.validPassword(password)) {
        this.setState({ btnEnable: false });
      } else this.setState({ btnEnable: true });
    });
  }

  validEmail(email) { // estrutura para verificaçao do email valido
    const parts = email.split('@');
    if (parts.length === 2) {
      const parts2 = parts[1].split('.');
      if (parts2.length === 2 && parts2[1] !== '') {
        return true;
      }
      return false;
    }
    return false;
  } // estrutura para verificaçao do email valido

  validPassword(password) { // estrutura para verificaçao do senha valido
    const tamanho = 6;
    if (password.length >= tamanho) {
      return true;
    }
    return false;
  } // estrutura para verificaçao do senha valido

  render() {
    const { email, password, btnEnable } = this.state;
    const { changeEmail, history } = this.props;
    return (
      <form>
        <input
          type="text"
          name="email"
          data-testid="email-input"
          onChange={ this.handleChange }
          value={ email }
        />
        <input
          type="password"
          name="password"
          data-testid="password-input"
          onChange={ this.handleChange }
          value={ password }
        />
        <input
          type="button"
          value="Entrar"
          disabled={ btnEnable }
          onClick={ () => {
            changeEmail(email);
            history.push('/carteira');
          } }
        />
      </form>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeEmail: (email) => dispatch({
    type: 'CHANGE_EMAIL', email,
  }),
});

Login.propTypes = {
  changeEmail: PropTypes.string.isRequired,
  history: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
