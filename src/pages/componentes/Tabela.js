import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense } from '../../actions';

class Tabela extends React.Component {
  render() {
    const { dados, remove } = this.props;
    return (
      <table>
        <thead>
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
        </thead>
        <tbody>
          {dados.map((key) => {
            const { ask, name } = key.exchangeRates[key.currency];
            const convertedValue = Number(key.value) * Number(ask);
            return (
              <tr key={ key.id }>
                <td>{key.description}</td>
                <td>{key.tag}</td>
                <td>{key.method}</td>
                <td>{key.value}</td>
                <td>{name}</td>
                <td>{ (Math.round(ask * 100) / 100).toFixed(2) }</td>
                <td>{ (Math.round(convertedValue * 100) / 100).toFixed(2) }</td>
                <td>Real</td>
                <td>Editar</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => remove(key.id) }
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
  dados: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  remove: (e) => dispatch(removeExpense(e)),
});

Tabela.propTypes = {
  dados: PropTypes.arrayOf(PropTypes.shape).isRequired,
  remove: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabela);
