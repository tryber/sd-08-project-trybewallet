import React, { Component } from 'react';
import { connect } from 'react-redux';

class Xablau extends Component {
  render() {
    return (
      <div>
        <div>
          <p data-testid="email-field">rr</p>
        </div>
        <div>
          <p data-testid="total-field">rr</p>
        </div>
        <div>
          <p data-testid="header-currency-field">rr</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

// const mapDispatchToProps = {

// };

export default connect(mapStateToProps)(Xablau);
