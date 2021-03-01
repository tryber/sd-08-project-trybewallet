import React from 'react';
import PropTypes from 'prop-types';

class Value extends React.Component {
  render() {
    const { func, value } = this.props;
    return (
      <label htmlFor="value">
        Valor:
        <input
          type="number"
          data-testid="value-input"
          id="value"
          value={ value }
          onChange={ func }
        />
      </label>
    );
  }
}

Value.propTypes = {
  func: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default Value;
