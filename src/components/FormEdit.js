import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveData, setEditData } from '../actions';
import SelectCurrency from './FormSelect/SelectCurrency';
import SelectMethod from './FormSelect/SelectMethod';
import SelectTag from './FormSelect/SelectTag';

class Form extends Component {
  constructor(props) {
    super(props);

    const { expArr, idToEdit } = this.props;
    const expenseItem = expArr.find((i) => Number(i.id) === Number(idToEdit));
    // console.log(expenseItem);
    const { id, value, description, currency, method, tag, exchangeRates } = expenseItem;

    this.state = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
  }

  handleChange({ name, value }) {
    // console.log(name, value);
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const editedExpense = { ...this.state };
    const { saveNewData } = this.props;
    saveNewData(editedExpense);
    // console.log(editedExpense);
  }

  render() {
    const { value } = this.state;
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
          Editar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  expArr: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (param) => dispatch(saveData(param)),
  saveNewData: (param) => dispatch(setEditData(param)),
});

Form.propTypes = {
  saveExpense: PropTypes.func,
  expArr: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Form);
