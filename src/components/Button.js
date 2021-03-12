import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { addUserEmail, addUserPassword } from '../actions/user';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      undisabled: false,
      proceed: false,
    };
    this.renderButton = this.renderButton.bind(this);
    this.toggleTrue = this.toggleTrue.bind(this);
    this.toggleFalse = this.toggleFalse.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    const { undisabled } = this.state;
    const { verifyEmail, verifyPassword } = this.props;
    if (!undisabled && verifyEmail && verifyPassword) {
      this.toggleTrue(); // Fazer duas funções iguais porque o chato do lint reclama.
    } else if ((undisabled && !verifyEmail) || (undisabled && !verifyPassword)) {
      this.toggleFalse();
    }
  }

  toggleTrue() {
    const { emailToSave, passwordToSave, saveEmail, savePassword } = this.props;
    const { email, password } = this.state;
    this.setState({
      email: emailToSave,
      password: passwordToSave,
      undisabled: true,
    }, () => saveEmail(email),
    savePassword(password));

    // this.setState({
    //   ... <= Problema com esse ponto
    // }, () => {
    //   const { undisabled, email, password } = this.state
    //  saveEmail(email), savePassword(password)
    // })
    this.renderButton();
  }

  toggleFalse() {
    this.setState({
      undisabled: false,
    });
    this.renderButton();
  }

  handleSubmit(e) {
    const { saveEmail, savePassword } = this.props;
    const { email, password } = this.state;
    e.preventDefault();
    saveEmail(email);
    savePassword(password);
    this.setState({
      proceed: true,
    });
  }

  renderButton() {
    const { undisabled } = this.state;
    let renderBtn;
    if (undisabled === true) {
      renderBtn = (
        <button
          type="submit"
          onClick={ (this.handleSubmit) }
          disabled={ false }
        >
          Entrar
        </button>);
    } else {
      renderBtn = <button type="submit" disabled>Entrar</button>;
    }
    return renderBtn;
  }

  render() {
    const { proceed } = this.state;
    const { emailToSave, passwordToSave } = this.props;
    return (
      <div>
        { this.renderButton(emailToSave, passwordToSave)}
        {proceed ? <Redirect to="/carteira" /> : ''}
      </div>
    );
  }
}

Button.propTypes = {
  verifyEmail: PropTypes.bool.isRequired,
  verifyPassword: PropTypes.bool.isRequired,
  emailToSave: PropTypes.string.isRequired,
  passwordToSave: PropTypes.string.isRequired,
  saveEmail: PropTypes.func.isRequired,
  savePassword: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (payload) => dispatch(addUserEmail(payload)),
  savePassword: (payload) => dispatch(addUserPassword(payload)),
});

export default connect(null, mapDispatchToProps)(Button);
