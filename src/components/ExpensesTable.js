import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpensesTable extends React.Component {
  render() {
    const { allExpenses } = this.props;
    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        {allExpenses.map((element) => {
          const {
            id,
            value,
            currency,
            method,
            tag,
            description,
            exchangeRates,
          } = element;
          const defaultExchange = exchangeRates[currency].codein;
          console.log(defaultExchange);
          return (
            <tr key={ id }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{value}</td>
              <td>{exchangeRates[currency].name}</td>
              <td>{parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
              <td>
                {parseFloat(value * exchangeRates[currency].ask).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button type="button">Editar</button>
                <button data-testid="delete-btn" type="button">Excluir</button>
              </td>
            </tr>
          );
        })}
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  allExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = (state) => ({
  allExpenses: state.wallet.expenses,
});

export default connect(mapDispatchToProps, null)(ExpensesTable);
