import React, { Component } from 'react';
// import { useHistory } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';

class SubmitForm extends Component {
  render() {
    const { handleClick, disabled } = this.props;
    return (
      <button
        type="button"
        onClick={ handleClick }
        disabled={ disabled }
      >
        Entrar
      </button>
    );
  }
}

export default SubmitForm;
// export default function SubmitForm(props) {
//   const { state } = props;
//   const history = useHistory();
//   const dispatch = useDispatch();

//   function handleClick() {
//     const { email } = state;
//     dispatch(saveEmail(email));
//     history.push('/carteira');
//   }

//   return (
//     <button
//       type="button"
//       onClick={ handleClick }
//       disabled={ !(REGEX.test(state.email)) || (state.password.length <= '5') }
//     >
//       Entrar
//     </button>
//   );
// }

// SubmitForm.propTypes = {
//   state: PropTypes.arrayOf(PropTypes.object).isRequired,
//   email: PropTypes.string.isRequired,
//   password: PropTypes.string.isRequired,
// };
