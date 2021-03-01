import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {

  render() {
    const { user: { email } } = this.props.readUser;
    const { wallet: { wallet: { expenses }} } = this.props.readUser;
    const { wallet: { wallet: { currencies }} } = this.props.readUser;

    return (
      <div>
        <p data-testid="email-field">Email: {email}</p>
        <p data-testid="total-field header-currency-field">Despesa Total: R$ {expenses} {currencies}</p>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  readUser: state,
});

export default connect(mapStateToProps)(Header);
