const URL = 'https://economia.awesomeapi.com.br/json/all';

// function fetchApi() {
//   try {
//     const request = fetch(URL)
//       .then((resp) => resp.json());
//     return request;

//   } catch (error) {
//     return console.log((`Ocorreu um erro - ${error}`))
//   }
// }

// export default fetchApi;

async function fetchApi() {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    return console.log(`Ops, algo deu errado - ${error}`);
  }
}

export default fetchApi;
