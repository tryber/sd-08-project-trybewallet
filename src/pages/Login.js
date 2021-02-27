import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Creators as UserActions } from '../actions';

const fieldsValidation = {
  email: (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email),
  password: (password) => password.length > +'5',
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: { email: '', password: '' },
      shouldRedirect: false,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.isInvalid = this.isInvalid.bind(this);
  }

  onInputChange({ target: { name, value } }) {
    this.setState(({ fields }) => ({
      fields: { ...fields, [name]: value },
    }));
  }

  isInvalid() {
    const { fields } = this.state;
    return Object.entries(fields)
      .map(([field, value]) => (fieldsValidation[field]
        ? fieldsValidation[field](value) : true))
      .some((validation) => !validation);
  }

  render() {
    const { fields: { email, password }, shouldRedirect } = this.state;
    const { saveEmail } = this.props;

    if (shouldRedirect) return <Redirect to="/carteira" />;
    return (
      <form
        onSubmit={ (e) => {
          e.preventDefault();
          this.setState({ shouldRedirect: true });
          saveEmail(email);
        } }
      >
        <input
          name="email"
          type="email"
          data-testid="email-input"
          value={ email }
          onChange={ this.onInputChange }
        />
        <input
          name="password"
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ this.onInputChange }
        />
        <button type="submit" disabled={ this.isInvalid() }>Entrar</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(UserActions, dispatch);

export default connect(null, mapDispatchToProps)(Login);
