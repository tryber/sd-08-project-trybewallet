import React, { Component } from 'react';

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.renderButton = this.renderButton.bind(this);
  }

  renderButton(boolean) {
    const button = (boolean === true)
      ? <button type="button">Entrar</button>
      : <button type="button" disabled>Entrar</button>;
    return button;
  }

  render() {
    const isValid = this.props;
    return (
      <div>
        {this.renderButton(isValid)}
      </div>
    );
  }
}
