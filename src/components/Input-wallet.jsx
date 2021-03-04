import React from 'react';
import PropTypes from 'prop-types';

class InputWallet extends React.Component {

  render() {
    const { label, name, options, type, value, ...restProps } = this.props;

    if (type === 'select') {
      return (
        <label htmlFor={ name }>
          { `${ label }: ` }
          <select
            name={ name }
            data-testid={ `${name}-input` }
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

InputWallet.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array])),
  value: PropTypes.string.isRequired,
};

InputWallet.defaultProps = {
  type: 'text',
  options: null,
};

export default InputWallet;
