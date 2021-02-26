import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { emailChange } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
    // como fazer um botão receber disabled foi retirado da seguinte fonte https://stackoverflow.com/questions/41488715/how-to-disable-button-in-react-js

    this.valLogin = this.valLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    }, () => {
      this.valLogin();
    });
  }
  // buscando como dividir uma expressão regex muito grande, acabei achando uma expressão bem menor para validação de email nessa fonte https://stackoverflow.com/questions/12317049/how-to-split-a-long-regular-expression-into-multiple-lines-in-javascript

  valLogin() {
    const { email, password } = this.state;
    let disabled = false;
    const validateEmail = /\S+@\S+\.\S+/;
    const minPassLength = 6;
    disabled = !(validateEmail.test(email) && password.length >= minPassLength);
    this.setState({ disabled });
  }

  handleClick(event) {
    event.preventDefault();
    const { handleEmail } = this.props;
    const { email } = this.state;
    handleEmail(email);
  }

  render() {
    const { email, password, disabled } = this.state;
    return (
      <>
        <h3>Login</h3>
        <form>
          <input
            type="text"
            name="email"
            data-testid="email-input"
            placeholder="alguem@alguem.com"
            value={ email }
            onChange={ this.handleChange }
          />
          <br />
          <br />
          <input
            type="text"
            name="password"
            data-testid="password-input"
            placeholder="password here"
            value={ password }
            onChange={ this.handleChange }
          />
          <br />
          <br />
          <button
            onClick={ this.handleClick }
            disabled={ disabled }
            type="submit"
          >
            <Link to="/carteira">
              Entrar
            </Link>
          </button>
        </form>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleEmail: (payload) => dispatch(emailChange(payload)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  handleEmail: PropTypes.func.isRequired,
};
