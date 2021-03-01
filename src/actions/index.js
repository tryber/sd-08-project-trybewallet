// Coloque aqui suas actions

export const addUseract = () => {
  const inpEml = document.getElementById('inpEml');
  return {
    type: 'USR_ADD',
    email: inpEml.value,
  };
};

export const inwalletact = () => ({
  type: 'MOEDA',
  ...state,
  wallet: {
    currencies: [action.currencies],
  },
});

export const outwalletact = () => ({
  type: 'MONEI_OUT',
  ...state,
  wallet: { expenses: [action.expenses] },

});

/* const xablau = 'xablau';
console.log(xablau);
 */
