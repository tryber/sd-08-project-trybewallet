import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../actions';

// let isDisable = true;
const maxLengthPassword = 5;
// const redirect = false;

class Login extends React.Component {
// const Login = () => {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      redirect: false,
      isDisable: true,
    };
    this.validate = this.validate.bind(this);
    this.changeform = this.changeform.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  validate() {
    const { email, password } = this.state;
    const re = /\S+@\S+\.\S+/;
    // console.table(this.state);
    if (password.length >= maxLengthPassword && re.test(email)) {
      console.log('passou');
      this.setState({ isDisable: false });
    } else {
      this.setState({ isDisable: true });
    }
  }

  // const [form, setform] = useState({ email: '', password: '' });
  changeform(e) {
    const typedValue = e.target.value;
    this.setState({
      [e.target.id]: typedValue,
    }, this.validate());
    // setform({ ...form, [name]: value });
  }

  submitForm(e) {
    e.preventDefault();
    const { loginEmail } = this.props;
    const { email } = this.state;
    loginEmail(email);
    this.setState({ redirect: true });
  }

  render() {
    const { email, password, redirect, isDisable } = this.state;
    return redirect
      ? <Redirect to="/carteira" />
      : (
        <form onSubmit={ this.submitForm }>
          Email:
          <input
            name="email"
            type="text"
            id="email"
            data-testid="email-input"
            required="required"
            value={ email }
            onChange={ this.changeform }
          />
          Senha:
          <input
            // codigo inspirado nesse tutorial
            // https://dev.to/cooljasonmelton/build-this-cool-password-checklist-with-react-and-css-4j1e
            name="password"
            type="password"
            id="password"
            data-testid="password-input"
            value={ password }
            required="required"
            onChange={ this.changeform }
          />
          <div>
            <button
              type="submit"
              disabled={ isDisable }
            >
              Entrar

            </button>
          </div>
        </form>
      );
  }
}

Login.propTypes = {
  loginEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loginEmail: (email) => dispatch(login(email)),
});

export default connect(null, mapDispatchToProps)(Login);
