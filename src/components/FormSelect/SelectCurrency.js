import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestCurrency } from '../../actions';
// import getCurrency from '../../services/Service';

class SelectCurrency extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // currencies: [],
      // currency: '',
    };
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  // async fetchCurrencies() {
  //   const { requestCurr } = this.props;
  //   const currencies = await getCurrency();
  //   this.setState({
  //     currencies,
  //   });
  //   requestCurr(currencies);
  //   console.log(currencies);
  // }

  // findExpense() {
  //   const { setEditData, idToEdit, editor } = this.props;
  //   const editExpenses = setEditData.find((i) => i.id === idToEdit);
  //   if (editor === true) this.setState({ currency: editExpenses.currency });
  // }

  render() {
    // const { currencies } = this.state;
    const { handleChange } = this.props;
    const newCurrencies = ['USD', 'CAD', 'EUR', 'GBP', 'ARS',
      'BTC', 'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];
    return (
      <select
        name="currency"
        data-testid="currency-input"
        onChange={ handleChange }
      >
        {
          newCurrencies.length > 0
          && newCurrencies.map((curr) => (
            <option
              key={ curr }
              data-testid={ curr }
              // value={ currencies.value }
            >
              {curr}
            </option>))
        }
      </select>
    );
  }
}

const mapStateToProps = (state) => ({
  setEditData: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  requestCurr: (param) => dispatch(requestCurrency(param)),
});

SelectCurrency.propTypes = {
  // requestCurr: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectCurrency);
