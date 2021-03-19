import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveData } from '../actions';
import { getExchangeRate } from '../services/Service';
import SelectCurrency from './FormSelect/SelectCurrency';
import SelectMethod from './FormSelect/SelectMethod';
import SelectTag from './FormSelect/SelectTag';

// Fiz com a ajuda do Rodolfo
const getId = (array) => {
  if (array.length === 0) {
    return 0;
  }
  return array[array.length - 1].id + 1;
};

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  async handleClick() {
    const exchangeRates = await getExchangeRate();
    // console.log(exchangeRates);
    const { value, description, currency, method, tag } = this.state;
    const { saveExpense, expArr } = this.props;
    const newExpense = { value, description, currency, method, tag, exchangeRates };
    newExpense.id = getId(expArr);
    saveExpense(newExpense);
    this.setState({
      value: 0,
    });
  }

  handleChange({ name, value }) {
    // console.log(name, value);
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { value } = this.state;
    // console.log(id, value, description, currency, method, tag);
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            value={ value }
            name="value"
            type="number"
            data-testid="value-input"
            onChange={ (e) => this.handleChange(e.target) }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            name="description"
            type="text"
            data-testid="description-input"
            onChange={ (e) => this.handleChange(e.target) }
          />
        </label>
        <SelectCurrency handleChange={ (e) => this.handleChange(e.target) } />
        <SelectMethod handleChange={ (e) => this.handleChange(e.target) } />
        <SelectTag handleChange={ (e) => this.handleChange(e.target) } />
        <button
          type="button"
          onClick={ () => this.handleClick() }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  expArr: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (param) => dispatch(saveData(param)),
});

Form.propTypes = {
  saveExpense: PropTypes.func,
  expArr: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Form);
