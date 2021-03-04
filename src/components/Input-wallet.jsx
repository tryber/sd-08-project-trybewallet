import React from 'react';
import PropTypes from 'prop-types';

class InputWallet extends React.Component {
  render() {
    const { label, name, options, type, value, id, children, ...restProps } = this.props;
    // const labelName = title && title[0].toUpperCase() + title.substring(1);
    if (type === 'select') {
      return (
        <label htmlFor={ id }>
          {`${label}: `}
          <select name={ name } id={ id } { ...restProps }>
            {children}
            {options.map((option, index) => (
              <option key={ index } value={ option } data-testid={ option }>
                {option}
              </option>
            ))}
          </select>
        </label>
      );
    }
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

InputWallet.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  ),
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

InputWallet.defaultProps = {
  type: 'text',
  options: null,
  children: null,
};

export default InputWallet;
