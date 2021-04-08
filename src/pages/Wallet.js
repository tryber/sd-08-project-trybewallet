import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormularioDespesa from '../componetes/FormularioDespesa';
import Header from '../componetes/Header';
import { fetchCoin as fetchCoinAction } from '../actions/wallet';
import Tabela from '../componetes/Tabela';
import FormularioEdicao from '../componetes/FormularioEdicao';
import Footer from '../componetes/Footer';

class Wallet extends React.Component {
  async componentDidMount() {
    const { fetchCoin } = this.props;
    await fetchCoin();
  }

  render() {
    const { editStatus } = this.props;

    return (
      <div>
        <Header />
        {editStatus ? <FormularioEdicao /> : <FormularioDespesa /> }
        <Tabela />
        <Footer />
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCoin: () => dispatch(fetchCoinAction()),
});

const mapStateToProps = (state) => ({
  editStatus: state.wallet.editStatus });

Wallet.propTypes = {
  fetchCoin: PropTypes.func.isRequired,
  editStatus: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
