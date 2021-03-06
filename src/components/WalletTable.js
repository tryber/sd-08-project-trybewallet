import React from 'react';
import { connect } from 'react-redux';

class WalletTable extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
        </tr>
        
        
        
        
        
        
        
        
        
        Editar/Excluir
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  emailStore: state.user.email,
  expensesStore: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(WalletTable);
