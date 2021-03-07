import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { excluirExpense } from '../actions';

class TableWallet extends React.Component {
  constructor(props) {
    super(props);

    this.renderTable = this.renderTable.bind(this);
  }

  renderTable() {
    return (
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
      </tr>);
  }

  render() {
    const { addExpenses, addExcluir } = this.props;

    return (
      <div>
        <table>
          {this.renderTable()}
          {addExpenses !== undefined
              && addExpenses.map((item) => {
                const { currency, exchangeRates, id } = item;

                const moeda = exchangeRates[currency];
                return (
                  <tr key={ item.id }>
                    <td>{item.description}</td>
                    <td>{item.tag}</td>
                    <td>{item.method}</td>
                    <td>{item.value}</td>
                    <td>{moeda.name}</td>
                    <td>{parseFloat(moeda.ask).toFixed(2)}</td>
                    <td>{(moeda.ask * parseInt(item.value, 10)).toFixed(2)}</td>
                    <td>Real</td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => addExcluir(id) }
                    >
                      Excluir
                    </button>
                  </tr>);
              })}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  addExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addExcluir: (value) => dispatch(excluirExpense(value)),
});

TableWallet.propTypes = {
  addExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  addExcluir: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableWallet);
