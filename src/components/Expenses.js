import React from 'react';
import { connect } from 'react-redux';

class Expenses extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <section>
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
          <tbody>
            {
              expenses.map(
                ({ id, description, method, tag, value, exchangeRates, currency }) => (
                  <tr key={ id }>
                    <td>{ description }</td>
                    <td>{ tag }</td>
                    <td>{ method }</td>
                    <td>{ value }</td>
                    <td>{ exchangeRates[currency].name }</td>
                    <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2) }</td>
                    <td>{ (value * exchangeRates[currency].ask).toFixed(2) }</td>
                    <td>Real</td>
                  </tr>
                ),
              )
            }
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Expenses);
