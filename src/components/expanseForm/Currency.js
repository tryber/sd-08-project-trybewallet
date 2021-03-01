import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Currency extends React.Component {
  render() {
    const { onChange, currencies } = this.props;
    return (
      <label className="div-form" htmlFor="currency">
        Moeda:
        {' '}
        <select
          name="currency"
          data-testid="currency-input"
          id="currency"
          onChange={ onChange }
        >
          {currencies.map((curr) => (
            <option
              data-testid={ curr }
              key={ curr }
              id={ curr }
              value={ curr }
            >
              {curr}
            </option>
          ))}
        </select>
      </label>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, null)(Currency);

Currency.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};
