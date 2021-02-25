import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.handlerInputChange = this.handlerInputChange.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);

    this.state = {
      email: '',
      password: '',
      disabled: true,
      backgroundButton: 'button-login button-disabled',
    };
  }

  handlerSubmit() {
    const { dispatchEmail, history } = this.props;
    const { email } = this.state;
    dispatchEmail(email);
    history.push('/carteira');
  }

  handlerInputChange({ target: { name, value } }) {
    this.setState({ [name]: value }, this.validateInputs);
  }

  validateInputs() {
    const { email, password } = this.state;
    const six = 6;
    if (email.match(/\S+@\S+\.\S+/) && password.length >= six) {
      this.setState({
        disabled: false,
        backgroundButton: 'button-login button-enabled',
      });
    } else {
      this.setState({
        disabled: true,
        backgroundButton: 'button-login button-disabled',
      });
    }
  }

  render() {
    const { disabled, backgroundButton } = this.state;
    return (
      <div>
        <form className="form">
          <h3>TRYBE WALLET</h3>
          <input
            type="text"
            name="email"
            data-testid="email-input"
            className="input-login"
            placeholder="insira aqui o seu e-mail"
            onChange={ (e) => this.handlerInputChange(e) }
          />
          <input
            type="password"
            name="password"
            data-testid="password-input"
            className="input-login"
            placeholder="insira aqui a sua senha"
            onChange={ (e) => this.handlerInputChange(e) }
          />
          <button
            type="button"
            className={ backgroundButton }
            disabled={ disabled }
            onClick={ this.handlerSubmit }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (e) => dispatch(saveEmail(e)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  dispatchEmail: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};
