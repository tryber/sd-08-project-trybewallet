import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getEmail from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      button: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.verifyEmail();
  }

  verifyEmail() {
    const { email, password } = this.state;
    const passwordSizemini = 5;
    if (email.match(/^\w{3,}@\w+\.\w{2,6}(\.\w{2})?[^\s+]$/gm)
    && password.length >= passwordSizemini) {
      this.setState({
        button: false,
      });
    } else {
      this.setState({
        button: true,
      });
    }
  }

  render() {
    const { saveEmail } = this.props;
    const { email, password, button } = this.state;
    return (
      <div>
        <form>
          <input
            name="email"
            placeholder="Email"
            onChange={ this.handleChange }
            value={ email }
            data-testid="email-input"
            type="text"
          />
          <p />
          <input
            name="password"
            placeholder="Senha"
            onChange={ this.handleChange }
            value={ password }
            data-testid="password-input"
            type="password"
          />
          <p />
          <button
            disabled={ button }
            onClick={ () => saveEmail(email) }
            type="button"
          >
            <Link to="/carteira">Entrar</Link>
          </button>
        </form>

      </div>
    );
  }
}

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(
    getEmail(email),
  ),
});

export default connect(null, mapDispatchToProps)(Login);
