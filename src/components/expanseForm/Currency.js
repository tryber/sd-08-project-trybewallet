import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getAPI from '../../services/requestAPI';
import { actionFetchCurrencies } from '../../actions/walletActions';

class Currency extends React.Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies(getAPI());
  }

  render() {
    const { currency, onChange, currencies } = this.props;
    return (
      <label className="div-form" htmlFor="currency">
        Moeda:
        {' '}
        <select
          name="currency"
          data-testid="currency-input"
          id={ currency }
          value={ currency }
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

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: (dataAPI) => dispatch(actionFetchCurrencies(dataAPI)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Currency);

Currency.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
