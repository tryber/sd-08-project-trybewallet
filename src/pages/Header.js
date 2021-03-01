import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { stateUser } = this.props;
    return (
      <>
        <header data-testid="email-field">{stateUser}</header>
        <section
          data-testid="total-field"
        >
          Despesas Totais:
          {0}
        </section>
        <div
          data-testid="header-currency-field"
        >
          BRL
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  stateUser: state.user.email,
});

Header.propTypes = {
  stateUser: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
