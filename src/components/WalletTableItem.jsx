import React from 'react';
import PropTypes from 'prop-types';

// const TABLE_HEADERS = [
//   'Descrição',
//   'Tag',
//   'Método de pagamento',
//   'Valor',
//   'Moeda',
//   'Câmbio utilizado',
//   'Valor convertido',
//   'Moeda de conversão',
// ];

function WalletTableItem({ data, ...rest }) {
  return (
    <tr role="row">
      <td role="cell">{ data.description }</td>
      <td role="cell">{ data.tag }</td>
      <td role="cell">{ data.method }</td>
      <td role="cell">{ Number(data.value).toFixed(2) }</td>
      <td role="cell">{ data.currency }</td>
      <td role="cell">{ data.name }</td>
      <td role="cell">{ data.converted }</td>
      <td role="cell"> Real </td>
      <td role="cell">
        <button type="button" data-testid="delete-btn">REMOVER</button>
      </td>
    </tr>
  );
}

WalletTableItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    ask: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    converted: PropTypes.number.isRequired,
  }).isRequired,
};

export default WalletTableItem;
