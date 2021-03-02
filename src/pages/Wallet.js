import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>

        <form>
          <label htmlFor="value-input">
            <span>Valor: </span>
            <input type="text" id="value-input" data-testid="value-input" />
          </label>

          <label htmlFor="description-input">
            <span>Descrição:</span>
            <input type="text" id="description-input" data-testid="description-input" />
          </label>

          <label htmlFor="method-input">
            <span>Método de pagamento:</span>
            <select id="method-input" data-testid="method-input">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag-input">
            <span>Categoria: </span>
            <select id="tag-input" data-testid="tag-input">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
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
