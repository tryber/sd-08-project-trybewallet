function getAPI() {
  return (
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      // .then((response) => console.log(response, 'Resposta da API'))
  );
}

export default getAPI;
