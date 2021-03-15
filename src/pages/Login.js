import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import userAction from '../actions/userAction';
import { fetchCurrencies as requestAPI } from '../actions/requestAPI';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      isDisable: true,
      email: '',
      password: '',
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    const { requestData } = this.props;
    requestData();
  }

  changeHandler(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => this.verifyLogin());
  }

  verifyLogin() {
    const pattern = /^[\w]+@([\w]+\.)+[\w]{2,4}$/gi;
    const { password, email } = this.state;
    const minPassword = 6;
    if (password.length >= minPassword
      && pattern.test(email)
    ) {
      this.setState({ isDisable: false });
    } else {
      this.setState({ isDisable: true });
    }
  }

  login() {
    const { userEmail } = this.props;
    const { email } = this.state;

    this.setState({ redirect: true });

    userEmail(email);
  }

  render() {
    const { email, password, isDisable, redirect } = this.state;
    return (
      <div className="container">
        Login:
        <input
          data-testid="email-input"
          type="email"
          name="email"
          value={ email }
          onChange={ this.changeHandler }
        />
        Senha:
        <input
          data-testid="password-input"
          type="password"
          name="password"
          minLength="6"
          value={ password }
          onChange={ this.changeHandler }
        />
        <button
          type="submit"
          disabled={ isDisable }
          onClick={ this.login }
        >
          Entrar
        </button>
        { redirect ? <Redirect to="/carteira" /> : null}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userEmail: (email) => dispatch(userAction(email)),
  requestData: () => dispatch(requestAPI()),
});

Login.propTypes = {
  userEmail: PropTypes.func.isRequired,
  requestData: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
