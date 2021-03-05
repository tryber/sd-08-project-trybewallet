import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ExpensesTable from './ExpensesTable';

class ExpensesForm extends React.Component {
  render() {
    const { expenses } = this.props;
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
        <tbody>
          { expenses.map((e) => (
            <ExpensesTable
              expenses={ e }
              key={ e.id }
            />
          )) }
        </tbody>
      </table>
    );
  }
}

ExpensesForm.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(ExpensesForm);
