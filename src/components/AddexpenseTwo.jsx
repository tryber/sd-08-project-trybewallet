import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddexpenseTwo extends Component {
  render() {
    const { infos: { description, paymentMethod, tag, handleChange } } = this.props;
    return (
      <>
        <label htmlFor="paymentMethod">
          Payment Method
          <select
            data-testid="method-input"
            value={ paymentMethod }
            name="paymentMethod"
            onChange={ handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select
            onChange={ handleChange }
            value={ tag }
            name="tag"
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          {' '}
          <input
            value={ description }
            onChange={ handleChange }
            type="text"
            name="description"
            data-testid="description-input"
          />
        </label>
      </>
    );
  }
}

AddexpenseTwo.propTypes = {
  infos: PropTypes.shape({
    description: PropTypes.string.isRequired,
    paymentMethod: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
  }).isRequired,
};
