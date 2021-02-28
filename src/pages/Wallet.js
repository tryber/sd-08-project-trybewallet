import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetApi } from '../actions';

const THREE = 3;
class Wallet extends React.Component {
  componentDidMount() {
    const { fetch } = this.props;
    fetch();
  }

  render() {
    const { email, moeda } = this.props;
    return (
      <>
        <header>
          <h1>TrybeWallet</h1>
          <p data-testid="email-field">{email}</p>
        </header>
        <section>
          <h2>Lista de Gastos</h2>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </section>
        <section>
          <h2>Cadastro de despasa</h2>
          <label htmlFor="valorDespesa">
            <br />
            Valor Despesa
            <br />
            <input
              id="valorDespesa"
              name="valorDespesa"
              data-testid="value-input"
            />
          </label>
          <br />
          <label htmlFor="descricaoDespesa">
            <br />
            Descrição Despesa
            <br />
            <input
              id="descricaoDespesa"
              name="descricaoDespesa"
              data-testid="description-input"
            />
          </label>
          <br />
          <select>
            {
              moeda.filter((e) => e.lethg === THREE)
                .map((e) => (<option key={ e }>{ e }</option>))
            }
          </select>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  moeda: state.wallet.currency,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: (e) => dispatch(fetApi(e)),
});

Wallet.propTypes = {
  fetch: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  moeda: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
