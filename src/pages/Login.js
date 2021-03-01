import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getEmail from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.verifyInputs = this.verifyInputs.bind(this);;

    this.state = {
      email: '',
      password: '',
      button: true,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
    this.verifyInputs();
  }

  verifyInputs() {
    const { email, password } = this.state;

    const FIVE = 5;

    if (email.match(/^\w{3,}@\w+\.\w{2,6}(\.\w{2})?[^\s+]$/gm)
    && password.length >= FIVE) {
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
    const { saveEmail } = this.props
    const { email, password, button } = this.state;
    return (
      <div>
        <h1>
          Home
        </h1>
        <div>
          Email:
          <input
            name="email"
            type="text"
            data-testid="email-input"
            placeholder="email"
            required
            value={ email }
            onChange={ this.handleChange }
          />
        </div>
        <div>
          Senha:
          <input
            name="password"
            type="password"
            data-testid="password-input"
            placeholder="senha"
            value={ password }
            onChange={ this.handleChange }
          />
        </div>
        <Link to="/carteira">
          <button
            disabled={ button }
            onClick={ () => saveEmail(email) }
            type="button"
          >
            Entrar
          </button>
        </Link>
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
