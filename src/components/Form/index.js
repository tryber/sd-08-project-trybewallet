import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import placeHolderType from '../../types';

const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class Form extends React.Component {
  constructor(props) {
    super(props);
    const { placeHolder } = this.props;
    this.state = placeHolder;
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange({ target: { name, value } }) {
    this.setState(() => ({
      [name]: value,
    }));
  }

  renderValueInput() {
    const { value } = this.state;
    return (
      <label htmlFor="value">
        Valor:
        <input
          name="value"
          id="value"
          data-testid="value-input"
          value={ value }
          onChange={ this.onInputChange }
        />
      </label>
    );
  }

  renderCurrenciesSelect() {
    const { currencies } = this.props;
    const { currency } = this.state;
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          name="currency"
          id="currency"
          data-testid="currency-input"
          value={ currency }
          onChange={ this.onInputChange }
        >
          { currencies.map((c) => (
            <option
              value={ c }
              data-testid={ c }
              key={ c }
            >
              { c }

            </option>
          ))}
        </select>
      </label>
    );
  }

  renderMethodSelect() {
    const { method } = this.state;
    return (
      <label htmlFor="method">
        Método de pagamento:
        <select
          name="method"
          id="method"
          data-testid="method-input"
          value={ method }
          onChange={ this.onInputChange }
        >
          { paymentMethods.map((m) => (
            <option
              value={ m }
              key={ m }
            >
              { m }

            </option>
          ))}
        </select>
      </label>
    );
  }

  renderTagSelect() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag">
        Tag:
        <select
          name="tag"
          id="tag"
          data-testid="tag-input"
          value={ tag }
          onChange={ this.onInputChange }
        >
          { tags.map((t) => (
            <option
              value={ t }
              key={ t }
            >
              { t }

            </option>
          ))}
        </select>
      </label>
    );
  }

  renderDescriptionInput() {
    const { description } = this.state;
    return (
      <label htmlFor="description">
        Descrição:
        <input
          name="description"
          id="description"
          data-testid="description-input"
          value={ description }
          onChange={ this.onInputChange }
        />
      </label>
    );
  }

  render() {
    const { onFormSubmit, buttonLabel, placeHolder } = this.props;
    return (
      <form
        onSubmit={ (e) => {
          e.preventDefault();
          onFormSubmit(this.state);
          this.setState(placeHolder);
        } }
      >
        { this.renderValueInput() }
        { this.renderCurrenciesSelect() }
        { this.renderMethodSelect() }
        { this.renderTagSelect() }
        { this.renderDescriptionInput() }
        <button type="submit">{ buttonLabel }</button>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

Form.propTypes = {
  placeHolder: placeHolderType.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Form);
