import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveInformation: '',
      undisabled: false,
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
      this.toggleTrue(); // Fazer duas funções iguais porque o lixo do lint reclama.
    } else if ((undisabled && !verifyEmail) || (undisabled && !verifyPassword)) {
      this.toggleFalse();
    }
  }

  toggleTrue() {
    this.setState({
      undisabled: true,
    });
    this.renderButton();
  }

  toggleFalse() {
    this.setState({
      undisabled: false,
    });
    this.renderButton();
  }

  handleSubmit() {
    const { emailToSave, passwordToSave } = this.props;
    this.setState({ saveInformation: [emailToSave, passwordToSave],
    });
  }

  renderButton() {
    const { undisabled } = this.state;

    let renderBtn;
    if (undisabled === true) {
      renderBtn = (
        <button
          type="button"
          onClick={ this.handleSubmit }
          disabled={ false }
        >
          Entrar
        </button>);
    } else {
      renderBtn = <button type="button" disabled>Entrar</button>;
    }
    return renderBtn;
  }

  render() {
    const { saveInformation } = this.state;
    return (
      <div>
        <h2>
          {`Seu e-mail é: ${saveInformation[0]}, sua senha é ${saveInformation[1]}`}
        </h2>
        {(this.renderButton())}
      </div>
    );
  }
}

Button.propTypes = {
  verifyEmail: PropTypes.bool.isRequired,
  verifyPassword: PropTypes.bool.isRequired,
  emailToSave: PropTypes.string.isRequired,
  passwordToSave: PropTypes.string.isRequired,
};

export default Button;
