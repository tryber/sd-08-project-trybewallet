import React from 'react';
import { connect } from 'react-redux';

class TableWallet extends React.Component {
  constructor(props) {
      super(props);

     
  }  
  

  render() {
    const { addExpenses: {wallet} } = this.props;
    console.log(wallet)
    return (
      <div>
        <table>
          <tr>

            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de Pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </table>
   
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  addExpenses: state,
});

export default connect(mapStateToProps)(TableWallet);
