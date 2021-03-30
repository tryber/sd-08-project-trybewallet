import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Header.css';

class Header extends React.Component {
  render() {
    const { user, wallet } = this.props;
    const { expenses } = wallet;
    const valueNumber = expenses.map((e) => Number(e.value)
    * e.exchangeRates[e.currency].ask);
    const contador = valueNumber.reduce((acc, curr) => acc + curr, 0);

    return (
      <div className="header">
        <h1 className="titulo">Bem-vindo a sua carteira</h1>
        <div className="box">
          <p data-testid="email-field" className="email">{`Email: ${user.email}`}</p>
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
