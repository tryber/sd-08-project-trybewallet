import React from 'react';
import PropTypes from 'prop-types';

class Currency extends React.Component {
  render() {
    const { func, fill } = this.props;
    const array = Object.keys(fill && fill.length && fill[0]);
    array.splice(1, 1);
    return (
      <label htmlFor="currency">
        Moeda:
        <select data-testid="currency-input" id="currency" onChange={ func }>
          { array
            .map((n) => <option data-testid={ n } key={ n }>{ n }</option>)}
        </select>
      </label>
    );
  }
}

Currency.propTypes = {
  func: PropTypes.func.isRequired,
  fill: PropTypes.shape(
    PropTypes.object.isRequired,
  ).isRequired,
};

export default Currency;
