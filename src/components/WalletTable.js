import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './WalletTable.css';

class WalletTable extends React.Component {
  render() {
    const { expenses } = this.props;
    const fields = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    return (
      <table>
        <tbody>
          <tr>
            {fields.map((field) => <th key={ field }>{field}</th>)}
          </tr>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{`${expense.currency} ${expense.value}`}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>
                {`R$ ${parseFloat(expense.exchangeRates[expense.currency].ask)
                  .toFixed(2)}`}
              </td>
              <td>
                {`R$ ${parseFloat(
                  expense.value * expense.exchangeRates[expense.currency].ask,
                ).toFixed(2)}`}
              </td>
              <td>Real Brasileiro</td>
              <td>
                <button type="button">Excluir</button>
                <button type="button">Editar</button>
              </td>
            </tr>))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

export default connect(mapStateToProps)(WalletTable);

WalletTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
