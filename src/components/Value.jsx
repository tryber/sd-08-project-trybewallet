import React from 'react';
import PropTypes from 'prop-types';

class Value extends React.Component {
  render() {
    const { func } = this.props;
    return (
      <label htmlFor="value">
        Valor:
        <input
          type="number"
          data-testid="value-input"
          onChange={ func }
        />
      </label>
    );
  }
}

Value.propTypes = {
  func: PropTypes.func.isRequired,
};

export default Value;
