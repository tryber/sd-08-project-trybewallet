import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tableHeaders, localCurrency } from '../const';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            { tableHeaders.map((header) => (
              <th key={ header }>{ header }</th>
            )) }
          </tr>
        </thead>
        <tbody>
          { expenses.map((
            { id, description, tag, method, value, currency, exchangeRates },
          ) => {
            const exchange = [...Object.values(exchangeRates), localCurrency]
              .find((exg) => (exg.code === currency));
            return (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ value }</td>
                <td>{ exchange.name }</td>
                <td>{ parseFloat(exchange.ask).toFixed(2) }</td>
                <td>{ parseFloat(exchange.ask * value).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button
                    onClick={ () => console.log('Editar') }
                    type="button"
                  >
                    Editar
                  </button>
                  <button
                    onClick={ () => console.log('Excluir') }
                    type="button"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.any.isRequired,
  ).isRequired,
};

export default connect(mapStateToProps)(Table);
