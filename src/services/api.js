const currency = {
  query: 'https://economia.awesomeapi.com.br/json/all',
};

export async function getCurrency() {
  try {
    const response = await fetch(currency.query);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export function currencySymbol() {
  return getCurrency().then((data) => {
    delete data.USDT;
    return Object.keys(data).map((item) => ({
      code: data[item].code, name: data[item].name,
    }));
  });
}
