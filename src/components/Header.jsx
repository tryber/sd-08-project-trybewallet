import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userEmail } = this.props;
    console.log(userEmail);
    return (
      <header>
        <section>
          <div>
            <p
              data-testid="email-field"
            >
              {userEmail}
            </p>
          </div>
          <div>
            <p
              data-testid="total-field"
            >
              {0}
            </p>
          </div>
          <div>
            <h3 data-testid="header-currency-field">
              {'BRL'}
            </h3>
          </div>
        </section>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
}

export default connect(mapStateToProps)(Header);
