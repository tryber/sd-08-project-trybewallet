import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { saveEmail as saveEmailAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  // https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
  checkValidity() {
    const { email, password } = this.state;
    const PASSWORD_LENGTH = 6;
    if (password.length < PASSWORD_LENGTH) return false;
    if (/\S+@\S+\.\S+/i.test(email)) return true;
    return true;
  }

  render() {
    const { email, password } = this.state;
    const { saveEmail } = this.props;
    return (
      <section>
        <form>
          <label htmlFor="email-input">
            Email:
            <input
              data-testid="email-input"
              id="email-input"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password-input">
            Senha:
            <input
              data-testid="password-input"
              id="password-input"
              name="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <Link
            to="/carteira"
          >
            <button
              type="submit"
              disabled={ !this.checkValidity() }
              onClick={ () => saveEmail(email) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </section>

    );
  }
}

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(saveEmailAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
