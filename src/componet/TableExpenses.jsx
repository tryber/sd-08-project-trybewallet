import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TableExpenses extends Component {
  constructor() {
    super();
    this.state = {
      expenses: '',
    };
  }

  componentDidMount() {
    // const { fetchCurrent } = this.props;
    // fetchCurrent();
    // .then(this.loading());
    // console.log(currency);
  }

  render() {
    const { expenses } = this.props;
    console.table(this.props);
    console.table(expenses);
    return (
      <div>
        Tabela prototipo
        Descrição, Tag, Método de pagamento, Valor, Moeda, Câmbio utilizado,
        Valor convertido, Moeda de conversão e Editar/Excluir
        <table>
          <tr>
            <td>Descrição</td>
            <td>Tag</td>
            <td>Método de pagamento</td>
            <td>Valor</td>
            <td>Moeda</td>
            <td>Câmbio utilizado</td>
            <td>Valor convertido</td>
            <td>Moeda de conversão</td>
            <td>Editar/Excluir</td>
          </tr>
          { expenses.map((linha) => (
            <tr key={ linha.id }>
              <td>{linha.description}</td>
              <td>{linha.tag}</td>
              <td>{linha.method}</td>
              {/* https://pt.stackoverflow.com/questions/114740/como-arredondar-com-2-casas-decimais-no-javascript-utilizando-uma-regra-específi */}
              <td>{Math.round(linha.value * 100) / 100}</td>
              <td>{linha.exchangeRates[linha.currency].name}</td>
              <td>{Math.round(linha.exchangeRates[linha.currency].ask * 100) / 100}</td>
              <td>
                {Math.round(
                  (linha.value * linha.exchangeRates[linha.currency].ask) * 100,
                ) / 100}
              </td>
              <td>Real</td>
              <td>
                <button type="button" data-testid="delete-btn">Delete</button>
                <button type="button" data-testid="delete-btn">Editar despesa</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}
TableExpenses.propTypes = {
  // send: PropTypes.func.isRequired,
  // fetchCurrent: PropTypes.func.isRequired,
  // // currency: PropTypes.objectOf().isRequired,
  expenses: PropTypes.objectOf().isRequired,
  // exchangeRates: PropTypes.objectOf().isRequired,
};

function mapStateToProps(state) {
  return {
    // currency: state.wallet.currency,
    expenses: state.wallet.expenses,
    // exchangeRates: state.wallet.exchangeRates,
  };
}

// const mapDispatchToProps = (dispatch) => ({
//   // send: (xablau) => dispatch(addRegister(xablau)),
//   // fetchCurrent: (xublau) => dispatch(GetAPIData(xublau)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(TableExpenses);
export default connect(mapStateToProps, null)(TableExpenses);
