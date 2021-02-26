import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userLogin } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirect: false,
      password: '',
      mail: '',
      buttonEnable: true,
    };

    this.enableButton = this.enableButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.redirectToWallet = this.redirectToWallet.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    }, this.enableButton);
  }

  enableButton() {
    const PASSWORD_LENGTH = 5;
    const { password, mail } = this.state;

    const emailPat = '^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+).(.[a-z]{2,3})$';
    const a = new RegExp(emailPat);
    if (a.test(mail) && password.length > PASSWORD_LENGTH) {
      this.setState({ buttonEnable: false });
    } else { this.setState({ buttonEnable: true }); }
  }

  redirectToWallet() {
    this.setState({
      shouldRedirect: true,
    });
  }

  render() {
    const { buttonEnable, password, mail, shouldRedirect } = this.state;
    const { loginUser } = this.props;

    if (shouldRedirect) return <Redirect to="/carteira" />;

    return (
      <>
        <label htmlFor="email">
          Email
          <input
            data-testid="email-input"
            value={ mail }
            name="mail"
            onChange={ this.handleChange }
            placeholder="arthur@gmdg.com"
            type="email"
            id="email"
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            data-testid="password-input"
            value={ password }
            name="password"
            onChange={ this.handleChange }
            id="password"
          />
        </label>
        <button
          onClick={ () => { loginUser(mail); this.redirectToWallet(); } }
          type="button"
          disabled={ buttonEnable }
        >
          Entrar
        </button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (user) => dispatch(userLogin(user)),
});

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
