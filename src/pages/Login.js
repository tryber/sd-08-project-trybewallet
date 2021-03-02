import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loginUser } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loginConfirm: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.formsCheck = this.formsCheck.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  formsCheck() {
    const { email, password } = this.state;
    const passwordMin = 6;
    const passwordCheck = (password.length < passwordMin);
    const emailCheck = ((!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)));
    if (passwordCheck || emailCheck) return true;
    return false;
  }
  // https://formik.org/docs/guides/validation (Regex validação e-mail)

  formSubmit(event) {
    event.preventDefault();
    const { clickLogin } = this.props;
    const { email } = this.state;
    clickLogin(email);
    this.setState({ loginConfirm: true });
    // console.log('teste submit');
  }

  render() {
    const { email, password, loginConfirm } = this.state;

    if (loginConfirm) return <Redirect to="/carteira" />;
    return (
      <form
        onSubmit={ this.formSubmit }
      >
        <h2>Login</h2>
        <label htmlFor="email">
          E-mail:
          <input
            type="text"
            name="email"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="text"
            name="password"
            data-testid="password-input"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <button
          disabled={ this.formsCheck() }
          type="submit"
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  clickLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  clickLogin: (email) => dispatch(loginUser(email)),
});

export default connect(null, mapDispatchToProps)(Login);
