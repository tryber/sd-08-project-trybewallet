import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../components/button';
import addEmail from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      isEmailValid: false,
      isPasswordValid: false,
    };

    this.handleEmail = this.handleEmail.bind(this);
  }

  handleEmail(event) {
    this.setState({
      email: event.target.value,
      isEmailValid: (!!(event.target.value.includes('@')
        && event.target.value.includes('.com'))),
    });
  }

  render() {
    const six = 6;
    const { email, isEmailValid, isPasswordValid } = this.state;
    const { addEmails } = this.props;
    return (
      <div>
        <input
          data-testid="email-input"
          name="email"
          value={ email }
          onChange={ this.handleEmail }
          type="email"
        />
        <input
          onChange={ (e) => this.setState(
            { isPasswordValid: e.target.value.length >= six },
          ) }
          data-testid="password-input"
          type="password"
        />
        <Button
          onClick={ addEmails(email) }
          isPasswordValid={ isPasswordValid }
          isEmailValid={ isEmailValid }
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addEmails: (email) => dispatch(addEmail(email)),
});

Login.propTypes = {
  addEmails: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
