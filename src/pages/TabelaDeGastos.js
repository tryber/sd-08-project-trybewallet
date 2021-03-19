import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TabelaDeGastos extends React.Component {
  constructor() {
    super();

    this.renderTableData = this.renderTableData.bind(this);
  }

  renderTableData() {
    const { expenses } = this.props;
    return (
      <tbody>
        {expenses.map((e) => {
          const cambio = (
            Math.floor(e.exchangeRates[e.currency].ask * 100) / 100
          );
          const valorConv = e.value * e.exchangeRates[e.currency].ask;
          const valorConvArr = Math.floor(valorConv * 100) / 100;
          return (
            <tr key={ e.id }>
              <td>{ e.description }</td>
              <td>{e.tag}</td>
              <td>{ e.method }</td>
              <td>{ e.value }</td>
              <td>{ e.currency }</td>
              <td>{ cambio }</td>
              <td>{ valorConvArr }</td>
              <td>Real</td>
              <td>PLACEHOLDER</td>
            </tr>);
        })}
      </tbody>
    );
  }

  render() {
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
        { this.renderTableData() }
      </table>
    );
  }
}

TabelaDeGastos.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

// const mapDispatchToProps = (dispatch) => ({
//   fetchCurrencies: () => dispatch(fetchCurrenciesAction()),
//   addExpense: (e) => dispatch(addExpenseAction(e)),
// });

export default connect(mapStateToProps, null)(TabelaDeGastos);
