import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCurrenciesAction from '../actions/requestCurrency';
import handleInputsAction from '../actions/handleInputs';

class CurrenciesSelection extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
    };

    this.changeSelection = this.changeSelection.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  changeSelection(event) {
    const { target: { value } } = event;
    const { handlingChange } = this.props;
    this.setState({
      value,
    });
    handlingChange(event);
  }

  render() {
    const { currencies } = this.props;
    const { value } = this.state;

    return (
      <label htmlFor="currency">
        Moeda:
        <select
          name="currency"
          value={ value }
          onChange={ this.changeSelection }
          data-testid="currency-input"
        >
          <option key="choose" value="">Escolha a Moeda</option>
          { currencies.map((option, index) => (option !== 'USDT') && (
            <option
              key={ index }
              value={ option }
              data-testid={ option }
            >
              { option }
            </option>
          )) }
        </select>
      </label>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesAction()),
  handlingChange: (event) => dispatch(handleInputsAction(event)),
});

CurrenciesSelection.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  handlingChange: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesSelection);
