import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../actions/fetchapi';

class Select extends React.Component {
  componentDidMount() {
    const { fetch } = this.props;
    fetch();
  }

  render() {
    const { currencies, onChange } = this.props;
    return (
      <div>
        <label htmlFor="currency">
          <select
            name="currency"
            onChange={ onChange }
            data-testid="currency-input"
            id="currency"
          >
            {currencies
              .filter((currency) => currency !== 'USDT')
              .map((validCurr) => (
                <option data-testid={ validCurr } key={ validCurr }>{ validCurr }</option>
              ))}
          </select>
          Tipo
        </label>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: (value) => dispatch(fetchCurrencies(value)),
});

Select.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Select);
