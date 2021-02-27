async function getAPI() {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const moedas = await response.json();
    return moedas;
  } catch (error) {
    return error;
  }
}

export default getAPI;
