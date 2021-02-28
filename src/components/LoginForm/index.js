import React from 'react';
// import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { string, func, bool } from 'prop-types';
import { Link } from 'react-router-dom';
import { loginAction } from '../../actions';

class FormLogin extends React.Component {
  renderInputEmail(email, handleInputChange) {
    return (
      <div>
        <input
          value={ email }
          onChange={ handleInputChange }
          name="email"
          required
          data-testid="email-input"
          type="email"
        />
      </div>
    );
  }

  renderInputPassword(password, handleInputChange) {
    return (
      <div>
        <input
          onChange={ handleInputChange }
          value={ password }
          name="password"
          required
          data-testid="password-input"
          type="password"
        />
      </div>
    );
  }

  renderButtonEnter(disabledBtn, email) {
    const user = { email };
    const { saveEmail: getEmail } = this.props;
    return (
      <div>
        <Link to="/carteira">
          <button
            disabled={ disabledBtn }
            onClick={ () => getEmail(user) }
            type="button"
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }

  render() {
    const {
      email,
      password,
      disabledBtn,
      handleInputChange,
    } = this.props;
    return (
      <form onSubmit={ (event) => event.preventDefault() }>
        {this.renderInputEmail(email, handleInputChange)}
        {this.renderInputPassword(password, handleInputChange)}
        {this.renderButtonEnter(disabledBtn, email)}
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(loginAction(email)),
});

FormLogin.propTypes = {
  email: string.isRequired,
  password: string.isRequired,
  disabledBtn: bool.isRequired,
  handleInputChange: func.isRequired,
  saveEmail: func.isRequired,
};

export default connect(null, mapDispatchToProps)(FormLogin);
