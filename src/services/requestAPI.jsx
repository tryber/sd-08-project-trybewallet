export default async function getApi() {
  const endpoint = await fetch('https://economia.awesomeapi.com.br/json/all');
  const response = await endpoint.json();
  return response;
}
