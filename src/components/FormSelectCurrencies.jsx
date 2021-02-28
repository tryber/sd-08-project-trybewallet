import React from 'react';
import { connect } from 'react-redux';

class FormSelectCurrencies extends React.Component {
  render() {
    const { apiCurrencies, currency, handleChange } = this.props;
    return (
      <>
        <span>Moeda:</span>
        <select
          value={ currency }
          name="currency"
          onChange={ handleChange }
          data-testid="currency-input"
        >
          {/* criando um map da props do mapState chamado apiCurrencies */}
          {
            apiCurrencies.map((value, index) => <option data-testid={ value } key={ index }>{value}</option>)
          }
        </select>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  const { currencies } = state.wallet;
  return {
    apiCurrencies: currencies,
  };
};
export default connect(mapStateToProps)(FormSelectCurrencies);
