import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
  thead() {
    return (
      <thead className="bg-info shadow text-white">
        <th>Descrição</th>
        <th>Tag</th>
        <th>Método de pagamento</th>
        <th>Valor</th>
        <th>Moeda</th>
        <th>Câmbio utilizado</th>
        <th>Valor convertido</th>
        <th>Moeda de conversão</th>
        <th>Editar/Excluir</th>
      </thead>
    );
  }

  render() {
    const { expense } = this.props;
    return (
      <table className="table table-hover overflowX">
        { this.thead() }
        <tbody>
          {
            expense.map((item, index) => {
              const currencie = item.exchangeRates[item.currency];
              return (
                <tr key={ index }>
                  <td>{ item.description }</td>
                  <td>{ item.tag }</td>
                  <td>{ item.method }</td>
                  <td>{ item.value }</td>
                  <td>{ currencie.name }</td>
                  <td>
                    { (Math.round(currencie.ask * 100) / 100).toFixed(2) }
                  </td>
                  <td>
                    {
                      (Math
                        .round(Number(item.value) * Number(currencie.ask) * 100) / 100)
                        .toFixed(2)
                    }
                  </td>
                  <td>Real</td>
                  <button type="button" className="btn btn-info">Editar</button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    className="btn btn-warning"
                  >
                    Excluir
                  </button>
                </tr>);
            })
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (store) => ({
  expense: store.wallet.expenses,
});

Table.propTypes = {
  expense: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(Table);
