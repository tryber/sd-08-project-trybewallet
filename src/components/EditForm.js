import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SelectCurrency from './form/SelectCurrency';
import SelectMethod from './form/SelectMethod';
import SelectTag from './form/SelectTag';
import { saveExpense } from '../actions';

class EditForm extends Component {
  constructor(props) {
    super(props);

    const { editId, expenses } = this.props;
    const exp = expenses.find((expense) => expense.id === editId);
    const { value, description, currency, method, tag, id, exchangeRates } = exp;
    this.state = {
      value,
      description,
      currency,
      method,
      tag,
      id,
      exchangeRates,
    };
  }

  handleChange({ name, value }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { saveExp } = this.props;
    const newExp = { ...this.state };
    // console.log(newExp);
    saveExp(newExp);
  }

  render() {
    const { value, description } = this.state;
    // console.log(this.state);
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            type="number"
            value={ value }
            name="value"
            onChange={ (e) => this.handleChange(e.target) }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
            onChange={ (e) => this.handleChange(e.target) }
          />
        </label>
        <SelectCurrency handleChange={ (e) => this.handleChange(e) } />
        <SelectMethod handleChange={ (e) => this.handleChange(e) } />
        <SelectTag handleChange={ (e) => this.handleChange(e) } />
        <button
          type="button"
          onClick={ () => this.handleClick() }
        >
          Editar
        </button>
      </form>
    );
  }
}

EditForm.propTypes = {
  expenses: PropTypes.array,
}.siRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editId: state.wallet.editId,
});

const mapDispatchToProps = (dispatch) => ({
  saveExp: (newExp) => dispatch(saveExpense(newExp)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
