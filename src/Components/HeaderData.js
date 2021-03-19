import React from 'react';

export default class HeaderExpenses extends React.Component {
  render() {
    return (
      <div>
        <div className="header-expenses">
          <div>Descrição</div>
          <div>Tag</div>
          <div>Método de pagamento</div>
          <div>Valor</div>
          <div>Moeda</div>
          <div>Câmbio utilizado</div>
          <div>Valor convertido</div>
          <div>Moeda de conversão</div>
          <div>Editar/Excluir</div>
        </div>
      </div>
    );
  }
}
