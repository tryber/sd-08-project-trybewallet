import React from 'react';
import PropTypes from 'prop-types';
import InputText from './InputText';
import Select from './Select';
import { objectToArray } from '../services';

const metodos = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const categorias = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class RenderForm extends React.Component {
  constructor() {
    super();
    this.renderInputs = this.renderInputs.bind(this);
    this.renderSelects = this.renderSelects.bind(this);
  }

  renderInputs() {
    const { value, description, onChange } = this.props;
    return (
      <>
        <InputText
          name="value"
          dataTest="value-input"
          value={ value }
          onChange={ onChange }
        >
          Valor:
        </InputText>
        <InputText
          name="description"
          dataTest="description-input"
          value={ description }
          onChange={ onChange }
        >
          Descrição:
        </InputText>
      </>
    );
  }

  renderSelects() {
    const { currency, method, tag, currencies, onChange } = this.props;
    return (
      <>
        <Select
          name="currency"
          dataTest="currency-input"
          value={ currency }
          options={ objectToArray(currencies) }
          onChange={ onChange }
        >
          Moeda:
        </Select>
        <Select
          name="method"
          dataTest="method-input"
          value={ method }
          options={ metodos }
          onChange={ onChange }
        >
          Método de Pagamento:
        </Select>
        <Select
          name="tag"
          dataTest="tag-input"
          value={ tag }
          options={ categorias }
          onChange={ onChange }
        >
          Método de Pagamento:
        </Select>
      </>
    );
  }

  render() {
    return (
      <form>
        {this.renderInputs()}
        {this.renderSelects()}
      </form>
    );
  }
}

RenderForm.propTypes = {
  value: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  method: PropTypes.arrayOf.isRequired,
  tag: PropTypes.arrayOf.isRequired,
  currencies: PropTypes.shape().isRequired,
};

export default RenderForm;
