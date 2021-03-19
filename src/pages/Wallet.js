import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      moedas: '',
      fetching: false,
    };
    this.renderCurrency = this.renderCurrency.bind(this);
  }

  componentDidMount() {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        const dataValues = Object.values(data).filter((moeda) => (
          moeda !== 'USDT' && moeda.name !== 'Dólar Turismo'
        ));
        this.setState({ moedas: dataValues, fetching: true });
      });
  }

  renderCurrency() {
    const { moedas } = this.state;
    return (
      <div>
        <label htmlFor="currency_input">
          Escolha uma moeda:
          <select id="currency" data-testid="currency-input">
            {moedas.map((moeda, index) => (
              <option
                key={ index }
                value={ moeda.bid }
                data-testid={ moeda.code }
              >
                {moeda.code}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }

  render() {
    const { fetching } = this.state;
    const { userEmail } = this.props;
    return (
      <div>
        TrybeWallet
        <br />
        <span data-testid="email-field">{userEmail}</span>
        <br />
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
        <label htmlFor="value_input">
          Despesa:
          <input
            id="value_input"
            type="text"
            name="value"
            placeholder="Digite a despesa"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description_input">
          Descrição:
          <input
            id="description_input"
            type="text"
            name="description"
            data-testid="description-input"
          />
        </label>
        {fetching ? this.renderCurrency() : <div>Loading...</div>}
      </div>
    );
  }
}

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

export default connect(mapStateToProps, null)(Wallet);
