import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail as saveEmailAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.loginValidation = this.loginValidation.bind(this);
  }

  handleClick() {
    const { saveEmail } = this.props;
    const { email } = this.state;
    const { history } = this.props;

    saveEmail(email);
    history.push('/carteira');
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value }, () => {
      this.loginValidation();
    });
  }

  loginValidation() {
    const { email, password } = this.state;
    const EMAIL_VALIDATION = /^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/; // Função retirada do plantão do Ícaro Harry
    const PASSWORD_LENGTH = 6;
    const disabled = !(
      EMAIL_VALIDATION.test(email) && PASSWORD_LENGTH <= password.length
    );
    this.setState({ disabled });
  }

  render() {
    const { email, password, disabled } = this.state;
    return (
      <form className="login-form">
        <input
          type="text"
          name="email"
          onChange={ this.handleChange }
          value={ email }
          data-testid="email-input"
          placeholder="user@email.com"
          className="login-input"
        />
        <input
          type="password"
          name="password"
          value={ password }
          data-testid="password-input"
          onChange={ this.handleChange }
          placeholder="******"
          className="login-input"
        />
        <button
          type="submit"
          className="login-btn"
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </form>
    );
  }
}

//  const mapStateToProps = (state) => ({
//  email: state.user.email,
//  });

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(saveEmailAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
  // email: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
