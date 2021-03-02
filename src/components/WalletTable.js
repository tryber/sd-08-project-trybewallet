import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WalletTd from './table/WalletTd';

const tableHeaderContent = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
  'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

const WalletTable = ({ expenses }) => (
  <section className="wallet-table">
    <table>
      <thead>
        <tr>
          { tableHeaderContent.map((value) => <th key={ value }>{value}</th>) }
        </tr>
      </thead>
      <tbody>
        { expenses.map((expense) => (
          <WalletTd key={ expense.id } data={ expense } />)) }
      </tbody>
    </table>
  </section>
);

WalletTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapState = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapState)(WalletTable);
