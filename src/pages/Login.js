import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
      login: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
  }

  handleClick() {
    const { handleEmail } = this.props;
    const { email } = this.state;
    this.setState({ login: true });

    handleEmail(email);
  }

  handleChange({ target }) {
    this.setState(
      {
        [target.name]: target.value,
      },
      () => {
        this.validateLogin();
      },
    );
  }

  validateLogin() {
    const { email, password } = this.state;
    const EMAIL_VALIDATION = /^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/; // Função retirada do plantão do Ícaro Harry
    const PASSWORD_LENGTH = 6;
    const disabled = !(
      EMAIL_VALIDATION.test(email) && PASSWORD_LENGTH <= password.length
    );
    this.setState({ disabled });
  }

  render() {
    const { email, password, disabled, login } = this.state;
    const { history } = this.props;
    return (
      <div>
        <form>
          <input
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="email-input"
            placeholder="user@email.com"
          />
          <input
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
            data-testid="password-input"
            placeholder="******"
          />
          <button
            type="submit"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
        {login ? history.push('/carteira') : ''}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleEmail: (payload) => dispatch(saveEmail(payload)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  handleEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
