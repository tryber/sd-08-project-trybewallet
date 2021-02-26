import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        {/* {email !== ''
          && ( */}
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
              </section>
            </>
          {/* )} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
