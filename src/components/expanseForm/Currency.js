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
    const { onChange, currencies } = this.props;
    return (
      <label className="div-form" htmlFor="currency">
        Moeda:
        <select name="currency" data-testid="currency-input">
          {currencies.map((currency) => (
            <option
              data-testid={ currency }
              key={ currency }
              value={ currency }
              onChange={ onChange }
            >
              {currency}
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
  onChange: PropTypes.func.isRequired,
};
