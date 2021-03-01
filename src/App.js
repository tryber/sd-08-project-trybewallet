import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import { walletThunk } from './actions';

class App extends React.Component {
  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  render() {
    return (
      <Switch>
        <Route path="/carteira" component={ Wallet } />
        <Route exact path="/" component={ Login } />
      </Switch>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: (value) => dispatch(walletThunk(value)),
});

export default connect(null, mapDispatchToProps)(App);

App.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
};
