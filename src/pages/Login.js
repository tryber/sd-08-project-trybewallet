import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { userLoginAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isValidated: true,
      toRedirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.btnClick = this.btnClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(
      (state) => ({
        ...state,
        [name]: value,
      }),
      () => this.validateFields(),
    );
  }

  validateFields() {
    const { email, password } = this.state;
    const regex = new RegExp('[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$', 'gm');
    const passwordLengthMin = 6;
    const checkedEmail = regex.test(email);
    const checkedPassword = password.length >= passwordLengthMin;
    if (checkedEmail && checkedPassword) {
      return this.setState((state) => ({
        ...state,
        isValidated: false,
      }));
    }
    this.setState((state) => ({
      ...state,
      isValidated: true,
    }));
  }

  btnClick() {
    const { saveLogin } = this.props;
    const { email } = this.state;
    saveLogin(email);
    this.setState((state) => ({
      ...state,
      toRedirect: true,
    }));
  }

  render() {
    const { email, password, isValidated, toRedirect } = this.state;
    return (
      <form>
        <label htmlFor="email">
          <input
            type="text"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          <input
            type="text"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <input
          type="button"
          value="Entrar"
          disabled={ !!isValidated }
          onClick={ this.btnClick }
        />
        { toRedirect ? <Redirect to="/carteira" /> : '' }
      </form>
    );
  }
}

// const mapStateToProps = (state) => ({

// });

const mapDispatchToProps = (dispatch) => ({
  saveLogin: (email) => dispatch(userLoginAction(email)),
});

Login.propTypes = {
  saveLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
