import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { user as userAction } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      checkedEmail: true,
      checkedPassword: true,
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangeEmail(email) {
    const a = new RegExp('[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$', 'gm');
    if (a.test(email)) {
      this.setState({ email,
        checkedEmail: false,
      });
    } else {
      this.setState({ checkedEmail: true });
    }
  }

  handleChangePassword(password) {
    const PASSWORD_LENGTH = 6;
    if (password.length >= PASSWORD_LENGTH) {
      this.setState({ checkedPassword: false });
    } else {
      this.setState({ checkedPassword: true });
    }
  }

  render() {
    const { email } = this.state;
    const { checkedEmail, checkedPassword } = this.state;
    const { user } = this.props;
    return (
      <div>
        <section>
          <input
            type="text"
            placeholder="User"
            data-testid="email-input"
            onChange={ (e) => this.handleChangeEmail(e.target.value) }
          />
          <input
            type="password"
            onChange={ (e) => this.handleChangePassword(e.target.value) }
            placeholder="Senha"
            data-testid="password-input"
          />
        </section>
        <Link
          to="/carteira"
        >
          <button
            type="button"
            disabled={ checkedEmail || checkedPassword }
            onClick={ () => user({ email }) }
          >
            Entrar
          </button>
        </Link>

      </div>
    );
  }
}

Login.propTypes = {
  user: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  user: (e) => dispatch(userAction(e)),
});

export default connect(null, mapDispatchToProps)(Login);
