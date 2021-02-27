// Coloque aqui suas actions
const USR_ADD = 'USR_ADD';

const addUser = USR_ADD => {
  const inpEml = document.getElementById('inpEml');
  return {
    type: USR_ADD,
    email: inpEml.value,
  };

};
