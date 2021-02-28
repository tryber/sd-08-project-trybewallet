import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const moeda = ['USD', 'CAD', 'EUR', 'GBP', 'ARS',
  'BTC', 'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];
class Header extends React.Component {
  render() {
    const { Semail } = this.props;
    return (
      <div>
        <div data-testid="email-field">
          {this.props.email}
        </div>
        <div data-testid="total-field">0</div>
        <select data-testid="header-currency-field">
          <option selected value="BRA">BRA</option>
          { moeda.map(
            (element) => (<option key={ element } value={ element }>{element}</option>),
          )}
        </select>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { email: state.email };
}
Header.propTypes = {
  Semail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);

// export default connect(null, mapDispatchToProps)(Header);
// export default Header;

// 3. Crie um header para a página de carteira contendo as seguintes características:
// Um elemento que exiba o email da pessoa usuária que fez login.

// Adicione o atributo data-testid="email-field".
// Dica: você deve pegar o email do estado global da aplicação (no Redux)
// Um campo com a despesa total gerada pela lista de gastos.

// Adicione o atributo data-testid="total-field".

// Inicialmente esse campo deve exibir o valor 0

// - Um elemento que exiba o email do usuário que fez login.
// - Crie um campo com a despesa total gerada pela lista de gastos.
