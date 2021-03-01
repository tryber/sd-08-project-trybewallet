import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { login } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
    this.handleInputs = this.handleInputs.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  isValid() {
    const { email, password } = this.state;
    const passwordLength = 6;
    const validPassword = password.length >= passwordLength;
    const validacaoByStackOf = email.match(/[\w.-]+@[\w-]+\.[\w-.]+/gi) && validPassword;
    this.setState({ disabled: !validacaoByStackOf });
  }

  handleInputs({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.isValid());
  }

  render() {
    const { disabled, email } = this.state;
    const { addEmail } = this.props;
    return (
      <form>
        <input
          type="email"
          name="email"
          placeholder="Email"
          data-testid="email-input"
          onChange={ this.handleInputs }
        />
        <input
          type="password"
          name="password"
          placeholder="senha"
          onChange={ this.handleInputs }
          data-testid="password-input"
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ disabled }
            onClick={ () => addEmail(email) }
          >
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addEmail: (email) => dispatch(login(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  addEmail: propTypes.func.isRequired,
};
