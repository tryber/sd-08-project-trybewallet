/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-lines-per-function */
import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

export default class FormWallet extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="value-input">
          Valor:
          <input
            value="xx"
            type="number"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            value="xx"
            type="text"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <input
            value="xx "
            data-testid="currency-input"
          />
        </label>
        <label htmlFor="method-input">
          Método de Pagamento:
          <select
            value="xx"
            data-testid="method-input"
          >
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
            <option value="Dinheiro">Dinheiro</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria:
          <select
            value="xx"
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}
