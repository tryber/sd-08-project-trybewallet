import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// const moeda = ['USD', 'CAD', 'EUR', 'GBP', 'ARS',
//   'BTC', 'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];

class Header extends React.Component {
  totalValues() {
    const { expenses } = this.props;
    // console.log(expenses);
    const result = expenses.reduce((acc, crr) => {
      if (crr !== undefined && acc !== undefined) {
        const { currency } = crr;
        let consumed = 0;
        if (currency === 'BRA' || currency === '') {
          consumed = parseFloat(crr.value);
        } else {
          // https://stackoverflow.com/questions/11508463/javascript-set-object-key-by-variable
          consumed = parseFloat(crr.value) * parseFloat(crr.exchangeRates[currency].ask);
        }
        return acc + consumed;
      }
    }, 0);
    return result;
  }

  render() {
    const { email } = this.props;
    const result = this.totalValues();
    // console.table(expenses.exchangeRates);
    // console.log(result);
    return (
      <div>
        <div data-testid="email-field">
          {email}
        </div>
        <div data-testid="total-field">{result}</div>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}
Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.string,
  }).isRequired,
};

function mapStateToProps(state) {
  return { email: state.user.email,
    expenses: state.wallet.expenses };
}

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
