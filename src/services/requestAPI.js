function getAPI() {
  return (
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((response) => Object.values(response))
  );
}

export default getAPI;
