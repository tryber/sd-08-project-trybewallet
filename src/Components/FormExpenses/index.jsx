import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ExpensesForm extends React.Component {
  render() {
    const { arrayCurrencyFiltered, handleChange, handleSubmit, state, isEditing,
    } = this.props;
    const { value, description, currency, method, tag } = state.expense;
    return (
      <div>
        <label htmlFor="value">
          Valor:
          <input
            value={ value }
            id="value"
            type="number"
            name="value"
            data-testid="value-input"
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            value={ description }
            id="description"
            type="text"
            name="description"
            data-testid="description-input"
            onChange={ (e) => handleChange(e) }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            value={ currency }
            name="currency"
            id="currency"
            data-testid="currency-input"
            onChange={ (e) => handleChange(e) }
          >
            {arrayCurrencyFiltered.map((coin) => (
              <option key={ coin } value={ coin } data-testid={ coin }>
                {coin}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de Pagamento:
          <select
            value={ method }
            id="method"
            name="method"
            data-testid="method-input"
            onChange={ (e) => handleChange(e) }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            value={ tag }
            id="tag"
            name="tag"
            data-testid="tag-input"
            onChange={ (e) => handleChange(e) }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        { (!isEditing)
          ? (
            <button
              type="button"
              onClick={ (e) => handleSubmit(e) }
            >
              Adicionar despesa
            </button>)
          : (
            <button
              type="button"
              onClick={ (e) => handleSubmit(e) }
            >
              Editar despesa
            </button>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isEditing: state.wallet.isEditing,
});

ExpensesForm.propTypes = {
  arrayCurrencyFiltered: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  state: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(ExpensesForm);
