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

  renderButton() {
    const { undisabled } = this.state;
    let render;
    if (undisabled === true) {
      render = <button type="button" disabled={ false }>Entrar</button>;
    } else {
      render = <button type="button" disabled>Entrar</button>;
    }
    return render;
  }

  render() {
    return (
      <div>{(this.renderButton())}</div>
    );
  }
}

Button.propTypes = {
  verifyEmail: PropTypes.bool.isRequired,
  verifyPassword: PropTypes.bool.isRequired,
};

export default Button;
