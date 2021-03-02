import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Cambio extends Component {
  constructor() {
    super();
    this.inputTabela = this.inputTabela.bind(this);
  }

  inputTabela() {
    const { stateExpenses } = this.props;
    // if (typeof (stateExpenses) !== 'undefined') {
    //   const { arrFinal, arrDeValores } = stateAuxiliar;
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
          {stateExpenses.map((objs) => (
            <tr key={ objs.id }>
              <td>{objs.description}</td>
              <td>{objs.tag}</td>
              <td>{objs.method}</td>
              <td>{objs.value}</td>
              <td>#Câmbio-utilizado</td>
              <td>#Valor-convertido</td>
              <td>Real</td>
              <td>#Delet</td>
            </tr>
          ))}
          {/* {stateExpenses.map((moeda) => (moeda !== 'USDT') && (
          (
            <option key={ moeda } value={ moeda } data-testid={ moeda }>
              {moeda}
            </option>
          )
        ))} */}
        </tbody>
      </table>
    );
  }
  // }

  render() {
    return (
      <div>
        <div data-testid="header-currency-field">
          CAMBIO BRL
        </div>
        {this.inputTabela()}
      </div>
    );
  }
}

// export default Cambio;

//   test('A tabela deve ser alimentada pelo estado da aplicação, que estará disponível na chave expenses que vem do reducer wallet.', () => {
//     renderWithRouterAndStore(<Wallet />, '/carteira', initial);
//     expect(screen.getAllByRole('cell', { name: 'Dez dólares' })[0]).toBeInTheDocument();
//     expect(screen.getAllByRole('cell', { name: 'Lazer' })[0]).toBeInTheDocument();
//     expect(screen.getAllByRole('cell', { name: 'Cartão de crédito' })[0]).toBeInTheDocument();
//     expect(screen.getAllByRole('cell', { name: '10' })[0]).toBeInTheDocument();
//     expect(screen.getAllByRole('cell', { name: 'Dólar Comercial' })[0]).toBeInTheDocument();
//     expect(screen.getAllByRole('cell', { name: '5.58' })[0]).toBeInTheDocument();
//     expect(screen.getAllByRole('cell', { name: '55.75' })[0]).toBeInTheDocument();
//     expect(screen.getAllByRole('cell', { name: 'Real' })[0]).toBeInTheDocument();

//     expect(screen.getAllByRole('cell', { name: 'Vinte euros' })[0]).toBeInTheDocument();
//     expect(screen.getAllByRole('cell', { name: 'Trabalho' })[0]).toBeInTheDocument();
//     expect(screen.getAllByRole('cell', { name: 'Dinheiro' })[0]).toBeInTheDocument();
//     expect(screen.getAllByRole('cell', { name: '20' })[0]).toBeInTheDocument();
//     expect(screen.getAllByRole('cell', { name: 'Euro' })[0]).toBeInTheDocument();
//     expect(screen.getAllByRole('cell', { name: '6.57' })[0]).toBeInTheDocument();
//     expect(screen.getAllByRole('cell', { name: '131.37' })[0]).toBeInTheDocument();
//     expect(screen.getAllByRole('cell', { name: 'Real' })[1]).toBeInTheDocument();
//   });
// });
const mapStateToProps = (state) => ({
  // arrDeValores: state.wallet.auxiliar.arrDeValores,
  // arrFinal: state.wallet.auxiliar.arrFinal,
  stateExpenses: state.wallet.expenses,
});
export default connect(mapStateToProps)(Cambio);
// export default ListaDeGastos;
Cambio.propTypes = {
  // arrFinal: PropTypes.arrayOf(PropTypes.string).isRequired,
  // arrDeValores: PropTypes.arrayOf(PropTypes.number).isRequired,
  // stateAuxiliar: PropTypes.shape.isRequired,
  stateExpenses: PropTypes.shape.isRequired,
};
