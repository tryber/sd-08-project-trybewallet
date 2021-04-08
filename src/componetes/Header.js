import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Header.css';

class Header extends React.Component {
  render() {
    const { user, wallet } = this.props;
    const { expenses } = wallet;
    const valueNumber = expenses ? expenses.map((e) => Number(e.value)
    * e.exchangeRates[e.currency].ask) : null;
    const contador = valueNumber.reduce((acc, curr) => acc + curr, 0);
    const url = 'https://cdn-0.imagensemoldes.com.br/wp-content/uploads/2020/04/Ilustra%C3%A7%C3%A3o-Dinheiro-PNG-1024x757.png';

    return (
      <div className="header">
        <p
          data-testid="email-field"
          className="email"
        >
          {`Olá, ${user.email} bem-vindo a sua carteira!`}
        </p>
        <div className="box">
          <img src={ url } alt="Notas" className="notas" />
          <div className="total">
            <p data-testid="total-field">{`Total: R$  ${contador.toFixed(2)} `}</p>
            <p data-testid="header-currency-field"> BRL</p>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

Header.propTypes = {
  user: PropTypes.objectOf().isRequired,
  wallet: PropTypes.objectOf().isRequired,
};

export default connect(mapStateToProps)(Header);
