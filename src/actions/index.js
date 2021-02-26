// Coloque aqui suas actions
const ADCIONAR_EMAIL = 'ADCIONAR_EMAIL';

export default adcionarEmail = (emailStore) => ({
  type: ADCIONAR_EMAIL,
  payload: { email: emailStore },
});
