import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">Despesas Totais: 0</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <div>
          Valor:
          <input
            data-testid="value-input"
          />
          <label htmlFor="description-input">
            Descrição:
            <input
              type="text"
              data-testid="description-input"
            />
          </label>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = ({ user: { email } }) => ({
  email,
});

export default connect(mapStateToProps, null)(Header);
