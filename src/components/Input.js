import React, { Component } from 'react';

class Input extends Component {
  render() {
    const { children, value, name, onChange, ...rest } = this.props;
    return (
      <div>
        <label htmlFor={ name }>
          { children }
          <input value={ value } name={ name } { ...rest } onChange={ onChange } />
        </label>
      </div>
    );
  }
}

export default Input;
