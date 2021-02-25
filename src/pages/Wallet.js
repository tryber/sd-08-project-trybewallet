import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../logo.svg';
import InputList from './InputList';
import TableTitles from './TableTitles';
import TableData from './TableData';
import { fetchCurrencies } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { apiCurrencies } = this.props;
    apiCurrencies();
  }

  render() {
    const { userEmail } = this.props;
    return (
      <>
        <header>
          <ul>
            <li><img src={ logo } alt="Logo" width="50px" /></li>
            <li data-testid="email-field">{`User: ${userEmail}`}</li>
            <li data-testid="total-field">{'Total Expenses: '}</li>
            <li data-testid="header-currency-field">Real</li>
          </ul>
        </header>
        <ul className="inputList">
          <InputList />
        </ul>
        <table>
          <TableTitles />
          <TableData />
        </table>
      </>
    );
  }
}
Wallet.propTypes = {
  userEmail: PropTypes.string,
  apiCurrencies: PropTypes.func.isRequired,
};

Wallet.defaultProps = {
  userEmail: 'a@a.ca',
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  apiCurrencies: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
