const requestMoneyType = () => ({
  type: 'REQUEST_MONEY_TYPE',
});

const getMoneyType = (json) => ({
  type: 'GET_MONEY_TYPE',
  payload: json,
});

const failedMoneyType = (error) => ({
  type: 'FAILED_REQUEST_TYPE',
  payload: error,
});

function fetchMoney() {
  return (dispatch) => {
    dispatch(requestMoneyType());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((r) => r.json()
        .then(
          (json) => dispatch(getMoneyType(json)),
          (error) => dispatch(failedMoneyType(error)),
        ));
  };
}

export default fetchMoney;
