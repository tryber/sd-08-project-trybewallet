import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();

    // this.state = {
    //   email: '',
    //   despesas: '',
    //   cambio: '',
    // };

    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.renderCurrencies = this.renderCurrencies.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderFormularioDespesas = this.renderFormularioDespesas.bind(this);
  }

  async fetchCurrencies() {
    let list = [];
    const url = 'https://economia.awesomeapi.com.br/json/all';
    list = await fetch(url);
    return list.json();
  }

  renderCurrencies() {
    // const curr = [];
    // this.fetchCurrencies()
    //   .then((items) => items.map((item) => {
    //     if (item.code !== 'USD') {
    //       return curr.push(item.code);
    //     }
    //     return '';
    //   }));
    // console.log(this.fetchCurrencies());
  }

  renderHeader() {
    const { user: { email } } = this.props;
    return (
      <header>
        <span data-testid="email-field">
          Email:
          { email }
        </span>
        <span data-testid="total-field">
          Despesas:
          placeholder
        </span>
        <span data-testid="header-currency-field">
          Cambio:
          placeholder
        </span>
      </header>
    );
  }

  renderFormularioDespesas() {
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input data-testid="value-input" />
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input data-testid="description-input" />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select data-testid="currency-input">
            {this.renderCurrencies()}
          </select>
        </label>
      </form>
    );
  }

  render() {
    return (
      <section>
        { this.renderHeader() }
        { this.renderFormularioDespesas() }
      </section>
    );
  }
}

Wallet.propTypes = {
  user: PropTypes.shape({ email: PropTypes.string.isRequired }).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});
// const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, null)(Wallet);
