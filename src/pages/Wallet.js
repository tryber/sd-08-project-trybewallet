import React from 'react';
import Form from '../components/Form';
import { connect } from 'react-redux'

class Wallet extends React.Component {
  render() {
    const { readUser } = this.props;
    const { wallet: { wallet: { expenses }} } = this.props.readUserState;
    const { wallet: { wallet: { currencies }} } = this.props.readUserState;
    return (
      <div>
        <p data-testid="email-field">Email: {readUser}</p>
        <p data-testid="total-field header-currency-field">Despesa Total: R$ {expenses} {currencies}</p>
        <Form />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  readUserState: state,
  readUser: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
