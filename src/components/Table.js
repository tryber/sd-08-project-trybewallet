import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  constructor() {
    super();
    this.inputTable = this.inputTable.bind(this);
  }

  inputTable() {
    const { expenses } = this.props;
    const headerArray = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

    return (
      <table>
        <thead>
          {headerArray.map((title) => <th key={ title }>{title}</th>)}
        </thead>
        <tbody>
          {expenses.map((data) => (
            <tr key={ data.id }>
              <td>{data.description}</td>
              <td>{data.tag}</td>
              <td>{data.method}</td>
              <td>{data.value}</td>
              <td>{data.exchangeRates[data.currency].name}</td>
              <td>{Number(data.exchangeRates[data.currency].ask).toFixed(2)}</td>
              <td>{(data.value * data.exchangeRates[data.currency].ask)}</td>
              <td>Real</td>
            </tr>))}
        </tbody>
      </table>
    );
  }

  render() {
    return <div>{this.inputTable()}</div>;
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps)(Table);
