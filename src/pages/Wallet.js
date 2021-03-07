import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getRequest from '../actions/wallet';
import Select from '../components/FormSelect';
import addExpense from '../actions/Submit';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      despesas: 0,
      currency: 'BRL',
    };
  }

  async componentDidMount() {
    const { getFetch } = this.props;
    await getFetch();
  }

  render() {
    const { email } = this.props;
    const { despesas, currency } = this.state;
    return (
      <div>
        <header>
          TrybeWallet
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">
            Despesa total:
            {' '}
            { despesas }
          </p>
          <p data-testid="header-currency-field">
            Moeda:
            {' '}
            { currency }
          </p>
        </header>
        <section>
          <form>
            <label htmlFor="valor despesa">
              Valor despesa:
              <input data-testid="value-input" name="valor despesa" type="number" />
            </label>
            <label htmlFor="descrição despesa">
              Descrição despesa:
              <input
                data-testid="description-input"
                name="descrição despesa"
                type="text"
              />
            </label>
            <Select />
            <button type="button">Adicionar despesa</button>
          </form>
        </section>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  obj: state.wallet.obj,
});

const mapDispatchToProps = (dispatch) => ({
  getFetch: () => dispatch(getRequest()),
  submit: (data) => dispatch(addExpense(data)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  getFetch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
