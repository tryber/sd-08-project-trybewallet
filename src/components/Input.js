import React, { Component } from 'react';

class Input extends Component {
  render() {
    const { children, name, datatestid, onChange, value } = this.props;
    return (
      <label htmlFor={ name }>
        { children }
        <input value={ value } onChange={ onChange } name={ name } data-testid={ datatestid } />
      </label>
    );
  }
}

export default Input;
