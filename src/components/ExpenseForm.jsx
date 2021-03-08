import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, addNewCurrencie } from '../actions/wallet';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.ALIMENTACAO = 'Alimentação';
    this.state = {
      currency: 'USD',
      description: '',
      value: '',
      method: 'Dinheiro',
      tag: this.ALIMENTACAO,
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveCurrentExpense = this.saveCurrentExpense.bind(this);
  }

  async componentDidMount() {
    const { fetchCrr } = this.props;
    await fetchCrr();
  }

  saveCurrentExpense(e) {
    e.preventDefault();
    const currentState = this.state;
    const { saveExpense } = this.props;
    saveExpense(currentState);
    this.setState({
      currency: 'USD',
      description: '',
      value: '',
      method: 'Dinheiro',
      tag: this.ALIMENTACAO,
    });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  renderSelect(name, options, content) {
    return (
      <label htmlFor={ name }>
        { `${content} :` }
        <select
          name={ name }
          data-testid={ `${name}-input` }
          onChange={ this.handleChange }
          id={ name }
        >
          {options.map((option, index) => (
            <option
              key={ index }
              value={ option }
              data-testid={ option }
            >
              { option }
            </option>
          ))}
        </select>
      </label>
    );
  }

  renderInput(name, content, value, type) {
    return (
      <label htmlFor={ name }>
        { `${content} :`}
        <input
          type={ type }
          name={ name }
          value={ value }
          data-testid={ `${name}-input` }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderTextArea(name, content, value) {
    return (
      <label htmlFor={ name }>
        { `${content} :`}
        <textarea
          name={ name }
          id={ name }
          value={ value }
          cols="20"
          rows="5"
          onChange={ this.handleChange }
          data-testid={ `${name}-input` }
        />
      </label>
    );
  }

  render() {
    const { currency, description, method, tag, value } = this.state;
    const { currencyOpt } = this.props;
    return (
      <form>
        {this.renderInput('value', 'Valor', value, 'number')}
        {this.renderTextArea('description', 'Descrição', description)}
        {this.renderSelect('currency', currencyOpt, 'Moeda', currency)}
        {this.renderSelect(
          'method',
          ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
          'Metodo',
          method,
        )}
        {this.renderSelect(
          'tag',
          ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
          'Tag',
          tag,
        )}
        <button
          type="submit"
          onClick={ this.saveCurrentExpense }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencyOpt: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCrr: () => dispatch(fetchCurrencies()),
  saveExpense: (expense) => dispatch(addNewCurrencie(expense)),
});

ExpenseForm.propTypes = {
  fetchCrr: PropTypes.func.isRequired,
  saveExpense: PropTypes.func.isRequired,
  currencyOpt: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
