import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class InputWallet extends React.Component {
  render() {
    const { label, name, options, type, value, ...restProps } = this.props;

    if (type === 'select') {
      return (
        <label htmlFor={ name }>
          { `${ label }: ` }
          <select
            name={ name }
            data-testid={ `${ name }-input` }
            { ...restProps }
          >
            {options.map((option, index) => (
              <option
                key={ index }
                value={ option }
                data-testid={ option }
              >
                { option }
              </option>
            ))}
          </select>
        </label>
      );
    }
    return (
      <div>
        <label htmlFor={ name }>
          { `${label}: ` }
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

export default InputWallet;
