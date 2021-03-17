import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: 'BRL',
      expenses: 0,
    };
  }

  render() {
    const { expenses, currency } = this.state;
    const { email } = this.props;
    return (
      <section>
        <p data-testid="email-field">{`Email: ${email}`}</p>
        <div>
          <span data-testid="total-field">{`Despesa total: ${expenses} `}</span>
          <span data-testid="header-currency-field">{ currency }</span>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
