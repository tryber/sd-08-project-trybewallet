import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ExpenseTable extends React.Component {
  render() {
    const { expenses } = this.props;
    console.log(expenses);
    return (
      <table>
        <thead>
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
        </thead>
        {
          expenses.map((expense) => {
            const { currency, description, exchangeRates,
              id, method, tag, value } = expense;
            const { ask, name } = exchangeRates[currency];
            const convertedValue = (value * ask).toFixed(2);
            const roundedAsk = parseFloat(ask).toFixed(2);

            return (
              <tbody key={ `${id}-tbody` }>
                <tr key={ `${id}-tr` }>
                  <td key={ `${id}-description` }>{ description }</td>
                  <td key={ `${id}-tag` }>{ tag }</td>
                  <td key={ `${id}-method` }>{ method }</td>
                  <td key={ `${id}-value` }>{ value }</td>
                  <td key={ `${id}-currency` }>{ name }</td>
                  <td key={ `${id}-ask` }>{ roundedAsk }</td>
                  <td key={ `${id}-convertedValue` }>{ convertedValue }</td>
                  <td key={ `${id}-BRL` }>Real</td>
                  <td key={ `${id}-buttons` }>
                    <button type="button">Editar</button>
                    <button type="button">Excluir</button>
                  </td>
                </tr>
              </tbody>
            );
          })
        }
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpenseTable.protoTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    currency: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    method: PropTypes.string,
    tag: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps)(ExpenseTable);
