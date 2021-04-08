import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actionUser from '../actions/user';
import styles from '../styles/Login.module.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };

    this.verifyEmailAndPassword = this.verifyEmailAndPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  verifyEmailAndPassword(email, password) {
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    const minCaracteres = 6;
    const result = emailRegex.test(email) && password >= minCaracteres;
    return !result;
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async handleClick() {
    const { history } = this.props;
    history.push('/carteira');
  }

  render() {
    const { handleChange, verifyEmailAndPassword, handleClick } = this;
    const { email, password } = this.state;
    const { user } = this.props;
    const url = 'https://travelpedia.com.br/wp-content/uploads/2019/07/economia-icon.png';
    const alt = 'Foto de uma calculadora';
    return (
      <div className={ styles.centro }>
        <form>
          <div className={ styles.conteudo }>
            <h1 className={ styles.titulo }>Trybe Wallet</h1>
            <img src={ url } alt={ alt } />
            <div className={ styles.alinhamento }>
              <input
                type="email"
                name="email"
                id="email"
                data-testid="email-input"
                value={ email }
                onChange={ handleChange }
                className={ styles.inputLogin }
                placeholder="Email"
              />
              <input
                type="password"
                name="password"
                id="password"
                value={ password }
                data-testid="password-input"
                onChange={ handleChange }
                placeholder="Password"
                className={ styles.inputLogin }
              />
              <button
                type="button"
                disabled={ verifyEmailAndPassword(email, password.length) }
                onClick={ () => { user(email); handleClick(); } }
                className={ styles.buttonLogin }
              >
                Entrar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  user: PropTypes.func.isRequired,

};

const mapDispatchToProps = (dispatch) => ({
  user: (value) => dispatch(actionUser(value)),
});

export default connect(null, mapDispatchToProps)(Login);
