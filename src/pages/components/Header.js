import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userEmail, expending } = this.props;
    return (
      <div className="header-content">
        <div className="header">
          <p data-testid="email-field">{ `Usuário:  ${userEmail.email}` }</p>
          <p data-testid="total-field">{ `Gastos: R$ ${expending}` }</p>
          <p data-testid="header-currency-field">Câmbio: BRL</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user,
  expending: state.wallet.expending,
});

Header.propTypes = {
  userEmail: PropTypes.objectOf(PropTypes.any),
  email: PropTypes.string,
  expending: PropTypes.number,
};

Header.defaultProps = {
  userEmail: { email: '' },
  email: '',
  expending: 0,
};

export default connect(mapStateToProps, null)(Header);
