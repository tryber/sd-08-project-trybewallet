import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency } from '../actions';

class Form extends Component {
  componentDidMount() {
    const { fetchCurr } = this.props;
    console.log(fetchCurr);
    fetchCurr();
  }

  render() {
    const { currency } = this.props;
    const CURRENCYLENGTH = 3;
    const ARRAYOFPAYMENTMETHOD = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const ARRAYOFEXPENSES = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form>
        <label data-testid="value-input" htmlFor="valor">
          Valor:
          <input type="number" id="valor" name="valor" />
        </label>
        <label data-testid="description-input" htmlFor="descriçao">
          Descrição:
          <input type="text" id="descriçao" name="descriçao" />
        </label>
        <label data-testid="currency-input" htmlFor="moeda">
          Moeda:
          <select id="moeda" name="moeda">
            {currency
              .map((eachCurrency, index) => (eachCurrency.length === CURRENCYLENGTH
                && (
                  <option
                    data-testid={ eachCurrency }
                    key={ index }
                  >
                    {eachCurrency}
                  </option>)))}
          </select>
        </label>
        <label data-testid="method-input" htmlFor="metodo">
          <select id="metodo" name="metodo">
            {ARRAYOFPAYMENTMETHOD
              .map((payType) => <option key={ payType }>{payType}</option>)}
          </select>
        </label>
        <label data-testid="tag-input" htmlFor="despesa">
          <select id="despesa" name="despesa">
            {ARRAYOFEXPENSES.map((expense) => <option key={ expense }>{expense}</option>)}
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: Object.keys(state.currency.currency),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurr: () => dispatch(fetchCurrency()),
});

Form.propTypes = {
  fetchCurr: PropTypes.object,
  currency: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Form);
