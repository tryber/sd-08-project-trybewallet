async function getAPI() {
  const resuest = await fetch('https://economia.awesomeapi.com.br/json/all');
  const response = await resuest.json();
  return response;
}

export default getAPI;
