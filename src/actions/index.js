// Coloque aqui suas actions
export const userEmail = (value) => ({
  type: 'USER_EMAIL',
  payload: {
    userEmail: value,
  },
});

export const getData = () => async (dispatch) => {
  try {
    dispatch({
      type: 'REQUEST_LOADING',
    });

    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const reponsejson = await response.json();

    dispatch({
      type: 'REQUEST_SUCESS',
      payload: {
        data: reponsejson,

      },
    });
  } catch (e) {
    dispatch({

      type: 'REQUEST_FAIL',
    });
  }
};

export const addExpense = (value) => ({
  type: 'ADD_EXPENSE',
  payload: {
    expenseData: value,
  },
});

export const removeExpense = (id) => ({
  type: 'REMOVE_EXPENSE',
  payload: {
    delete: id,
  },
});
