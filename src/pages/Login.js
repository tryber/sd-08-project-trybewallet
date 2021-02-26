import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import addEmail from '../actions/addEmail';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      password: '',
    };
  }

  render() {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
    const minLength = 6;
    const { addemail, history, email } = this.props;
    const { password } = this.state;
    return (
      <form>
        <label htmlFor="label-email">
          Email
          <input
            type="text"
            data-testid="email-input"
            onChange={ (e) => addemail(e.target.value) }
          />
        </label>
        <label htmlFor="label-senha">
          Senha
          <input
            type="text"
            data-testid="email-password-input"
            onChange={ ({ target }) => this.setState({ password: target.value }) }
          />
        </label>
        <button
          type="button"
          disabled={ !regexEmail.test(email) || password.length < minLength }
          onClick={ () => history.push('/carteira') }
        >
          Entrar
        </button>

      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addemail: (item) => dispatch(addEmail(item)),
});
const mapStateToPops = (state) => ({
  email: state.user.email,

});

Login.propTypes = {
  addemail: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  history: PropTypes.objectOf().isRequired,
};

export default connect(mapStateToPops, mapDispatchToProps)(Login);
