import React from 'react';
import PropTypes from 'prop-types';

class Value extends React.Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <label className="div-form" htmlFor="value">
        Valor:
        {' '}
        <input
          type="number"
          name="value"
          data-testid="value-input"
          value={ value }
          onChange={ onChange }
        />
      </label>
    );
  }
}

export default Value;

Value.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
