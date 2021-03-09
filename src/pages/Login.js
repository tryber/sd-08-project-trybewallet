import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import saveEmailAction from '../actions/saveEmail';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      buttonValidation: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.loginValidation = this.loginValidation.bind(this);
  }

  handleChange({ target }) {
    const { value, name } = target;

    this.setState(() => ({ [name]: value }), () => this.loginValidation());
  }

  loginValidation() {
    const { email, password } = this.state;
    const LENGTH_SIX = 6;
    const regex = /[a-zA-Z0-9\-_.]+@[a-zA-Z0-9]+.[a-z]+$/gm.test(email);
    if (regex
      && password.length >= LENGTH_SIX) {
      this.setState({ buttonValidation: false });
    } else {
      this.setState({ buttonValidation: true });
    }
  }

  render() {
    const { email, buttonValidation } = this.state;
    const { saveEmail } = this.props;
    return (
      <div>
        <label htmlFor="login">
          Login:
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChange }
          />

          <input
            type="password"
            name="password"
            // onKeyUp={ this.loginValidation }
            placeholder="Senha"
            onChange={ this.handleChange }
            data-testid="password-input"
          />
          <Link to="/carteira" onClick={ () => saveEmail(email) }>
            <button
              type="button"
              disabled={ buttonValidation }
            >
              Entrar
            </button>
          </Link>
        </label>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(saveEmailAction(email)),
});

Home.propTypes = {
  saveEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Home);
