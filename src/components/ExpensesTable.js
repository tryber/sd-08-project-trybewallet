import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from '../styles/components/ExpensesTable.module.css';

class ExpensesTable extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table className={ styles.expensesTable }>
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
          { expenses.map((expense) => {
            const { value, description, currency,
              method, tag, exchangeRates, id } = expense;
            const currencyData = exchangeRates[currency];
            const convertedValue = +currencyData.ask * +value;
            return (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ value }</td>
                <td>{ currencyData.name }</td>
                <td>{ Math.round(currencyData.ask * 100) / 100 }</td>
                <td>{ Math.round(convertedValue * 100) / 100 }</td>
                <td>Real</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(ExpensesTable);
