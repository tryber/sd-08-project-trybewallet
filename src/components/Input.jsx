import React, { Component } from 'react';

class Input extends Component {
  render() {
    const { label, name, options, type, value, ...restProps } = this.props;
    return (
      <div>
        <label htmlFor={ name }>
          {`${label}: `}
          <input
            type={ type }
            data-testid={ `${name}-input` }
            name={ name }
            id={ name }
            value={ value }
            { ...restProps }
          />
        </label>
      </div>
    );
  }
}

export default Input;
