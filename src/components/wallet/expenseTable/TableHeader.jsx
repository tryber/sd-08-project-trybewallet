import React from 'react';

function TableHeader() {
  const header = [
    'Descrição',
    'Tag',
    'Método de pagamento',
    'Valor',
    'Moeda',
    'Câmbio utilizado',
    'Valor convertido',
    'Moeda de conversão',
    'Editar/Excluir',
  ];

  return (
    <thead>
      <tr>
        {header.map((item) => <th key={ item }>{item}</th>)}
      </tr>
    </thead>
  );
}

export default TableHeader;
