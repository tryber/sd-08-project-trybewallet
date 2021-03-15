import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actionWallet from '../../actions/wallet';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { value, currency, method, tag, description } = this.state;
    const { saveExpenses } = this.props;
    saveExpenses(value, currency, method, tag, description);
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input name="value" data-testid="value-input" onChange={ this.handleChange } />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select name="currency" data-testid="currency-input">
            {currencies.map((currency) => (
              <option value={ currency } key={ currency }>{currency}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method-input">
          Método de Pagamento:
          <select name="method" data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Tag:
          <select name="tag" data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            name="description"
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
        <button type="submit">Adicionar despesa</button>
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  saveExpenses: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpenses: (value, currency, method, tag) => dispatch(
    actionWallet(value, currency, method, tag),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
