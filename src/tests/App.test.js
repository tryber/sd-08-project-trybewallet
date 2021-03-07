import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { response as mockData, initialStateHeader, initialStateWithExpenses } from './mockData';
import App from '../App';
import Wallet from '../pages/Wallet';

import { renderWithRouterAndStore } from './testConfig'

const apiResponse = Promise.resolve({
  json: () => Promise.resolve(mockData),
  ok: true,
});

const mockedExchange = jest.spyOn(global, 'fetch').mockImplementation(() => apiResponse);

afterEach(() => jest.clearAllMocks());

describe('1 - [PÁGINA DE LOGIN] Crie uma página inicial de login com os seguintes campos e características:', () => {
  test('A rota para esta página deve ser \'/\'', () => {
    const { history } = renderWithRouterAndStore(<App />);
    expect(history.location.pathname).toBe('/');
  });

  test('Crie um local para que o usuário insira seu email e senha', () => {
    renderWithRouterAndStore(<App />, '/');
    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');

    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
  });

  test('Crie um botão com o texto \'Entrar\'', () => {
    renderWithRouterAndStore(<App />, '/');

    const button = screen.getByText(/Entrar/i);
    expect(button).toBeInTheDocument();
  });

  test('Realize as seguintes verificações nos campos de email, senha e botão:', () => {
    renderWithRouterAndStore(<App />);

    const button = screen.getByText(/Entrar/i);
    expect(button).toBeDisabled();

    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');

    userEvent.type(email, 'email');
    userEvent.type(senha, '123456');
    expect(button).toBeDisabled();

    userEvent.type(email, 'email@com@');
    userEvent.type(senha, '123456');
    expect(button).toBeDisabled();

    userEvent.type(email, 'emailcom@');
    userEvent.type(senha, '123456');
    expect(button).toBeDisabled();

    userEvent.type(email, 'alguem@email.com');
    userEvent.type(senha, '23456');
    expect(button).toBeDisabled();

    userEvent.type(email, 'alguem@email.');
    userEvent.type(senha, '123456');
    expect(button).toBeDisabled();

    userEvent.type(email, 'alguem@email.com');
    userEvent.type(senha, '123456');
    expect(button).toBeEnabled();
  });

  test('Salve o email no estado da aplicação, com a chave email, assim que o usuário logar.', () => {
    const { store } = renderWithRouterAndStore(<App />);
    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const button = screen.getByText(/Entrar/i);

    userEvent.type(email, 'alguem@email.com');
    userEvent.type(senha, '123456');
    fireEvent.click(button);

    expect(store.getState().user.email).toBe('alguem@email.com');
  });

  test('A rota deve ser mudada para \'/carteira\' após o clique no botão.', () => {
    const { history } = renderWithRouterAndStore(<App />);
    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const button = screen.getByText(/Entrar/i);

    userEvent.type(email, 'alguem@email.com');
    userEvent.type(senha, '123456');
    fireEvent.click(button);

    expect(history.location.pathname).toBe('/carteira');
  });
});

describe('2 - [PÁGINA DA CARTEIRA] Crie uma página para sua carteira com as seguintes características:', () => {
  test('A rota para esta página deve ser \'/carteira\'', () => {
    const { history } = renderWithRouterAndStore(<App />);
    history.push('/carteira');
    const email = screen.queryByTestId('email-input');
    expect(email).toBeNull();
  });

  test('O componente deve se chamar Wallet e estar localizado na pasta "src/pages"', () => {
    const { container } = renderWithRouterAndStore(<Wallet />, '/carteira', {});
    expect(container).toBeDefined();
  });
});

describe('3 - [PÁGINA DA CARTEIRA] Crie um header para a página de carteira contendo as seguintes características:', () => {
  const initial = initialStateHeader;

  test('Um elemento que exiba o email do usuário que fez login.', () => {
    const { store } = renderWithRouterAndStore(<Wallet />, '/carteira', initial);
    const emailField = screen.getByTestId('email-field');

    expect(emailField.innerHTML).not.toBe('');
    expect(emailField).toContainHTML(store.getState().user.email);
  });

  test('Crie um campo com a despesa total gerada pela lista de gastos.', () => {
    renderWithRouterAndStore(<Wallet />, '/carteira', initial);
    const totalField = screen.getByTestId('total-field');

    const INITIAL_VALUE = 0;
    expect(totalField).toContainHTML(INITIAL_VALUE);
  });

  test('Crie um campo que mostre que qual câmbio está sendo utilizado, que será neste caso \'BRL\'', () => {
    renderWithRouterAndStore(<Wallet />, '/carteira');
    const exchangeField = screen.getByTestId('header-currency-field');

    expect(exchangeField).toBeInTheDocument();
    expect(exchangeField).toContainHTML('BRL');
  });
});

describe('4 - [PÁGINA DA CARTEIRA] Desenvolva um formulário para adicionar uma despesa contendo as seguintes características:', () => {
  test('Um campo para adicionar o valor da despesa', async () => {
    renderWithRouterAndStore(<Wallet />, '/carteira');
    const valueInput = await screen.findByTestId('value-input');

    expect(valueInput).toBeInTheDocument();
  });

  test('Um campo para adicionar a descrição da despesa', async () => {
    renderWithRouterAndStore(<Wallet />, '/carteira');
    const descriptionInput = await screen.findByTestId('description-input');

    expect(descriptionInput).toBeInTheDocument();
  });

  test('Um campo para selecionar em qual moeda será registrada a despesa', async () => {
    renderWithRouterAndStore(<Wallet />, '/carteira');
    const currencyInput = await screen.findByTestId('currency-input');
    const USD = screen.getByTestId('USD');
    const CAD = screen.getByTestId('CAD');
    const EUR = screen.getByTestId('EUR');
    const GBP = screen.getByTestId('GBP');
    const ARS = screen.getByTestId('ARS');
    const BTC = screen.getByTestId('BTC');
    const LTC = screen.getByTestId('LTC');
    const JPY = screen.getByTestId('JPY');
    const CHF = screen.getByTestId('CHF');
    const AUD = screen.getByTestId('AUD');
    const CNY = screen.getByTestId('CNY');
    const ILS = screen.getByTestId('ILS');
    const ETH = screen.getByTestId('ETH');
    const XRP = screen.getByTestId('XRP');
    const USDT = screen.queryByText(/USDT/g);

    expect(mockedExchange).toBeCalled();
    expect(mockedExchange).toBeCalledWith('https://economia.awesomeapi.com.br/json/all');
    expect(currencyInput).toBeInTheDocument();
    expect(USD).toBeInTheDocument();
    expect(CAD).toBeInTheDocument();
    expect(EUR).toBeInTheDocument();
    expect(GBP).toBeInTheDocument();
    expect(ARS).toBeInTheDocument();
    expect(BTC).toBeInTheDocument();
    expect(LTC).toBeInTheDocument();
    expect(JPY).toBeInTheDocument();
    expect(CHF).toBeInTheDocument();
    expect(AUD).toBeInTheDocument();
    expect(CNY).toBeInTheDocument();
    expect(ILS).toBeInTheDocument();
    expect(ETH).toBeInTheDocument();
    expect(XRP).toBeInTheDocument();
    expect(USDT).not.toBeInTheDocument();
  });

  test('Um campo para selecionar qual método de pagamento será utilizado', async () => {
    renderWithRouterAndStore(<Wallet />, '/carteira');
    const methodInput = await screen.findByTestId('method-input');
    const moneyOption = screen.getByText(/Dinheiro/);
    const creditOption = screen.getByText(/Cartão de crédito/);
    const debitOption = screen.getByText(/Cartão de débito/);

    expect(methodInput).toBeInTheDocument();
    expect(moneyOption).toBeInTheDocument();
    expect(creditOption).toBeInTheDocument();
    expect(debitOption).toBeInTheDocument();
  });

  test('Um campo para selecionar uma categoria (tag) para a despesa.', async () => {
    renderWithRouterAndStore(<Wallet />, '/carteira');
    const tagInput = await screen.findByTestId('tag-input');
    const foodOption = screen.getByText(/Alimentação/);
    const funOption = screen.getByText(/Lazer/);
    const workOption = screen.getByText(/Trabalho/);
    const transportOption = screen.getByText(/Transporte/);
    const healthOption = screen.getByText(/Saúde/);

    expect(tagInput).toBeInTheDocument();
    expect(foodOption).toBeInTheDocument();
    expect(funOption).toBeInTheDocument();
    expect(workOption).toBeInTheDocument();
    expect(transportOption).toBeInTheDocument();
    expect(healthOption).toBeInTheDocument();
  });

  test('Um botão com o texto \'Adicionar despesa\' que salva as informações da despesa no estado global e atualiza a soma de despesas no header', async () => {
    const { store } = renderWithRouterAndStore(<Wallet />, '/carteira');
    const addButton = await screen.findByText(/Adicionar despesa/i);
    const valueInput = await screen.findByTestId('value-input');
    const currencyInput = await screen.findByTestId('currency-input');
    const methodInput = await screen.findByTestId('method-input');
    const tagInput = await screen.findByTestId('tag-input');
    const descriptionInput = await screen.findByTestId('description-input');

    expect(addButton).toBeInTheDocument();

    userEvent.type(valueInput, '10');
    userEvent.selectOptions(currencyInput, 'USD');
    userEvent.selectOptions(methodInput, 'Cartão de crédito');
    userEvent.selectOptions(tagInput, 'Lazer');
    userEvent.type(descriptionInput, 'Dez dólares');
    fireEvent.click(addButton);
    expect(mockedExchange).toBeCalledTimes(2);

    const expectedStateExpense = [
      {
        id: 0,
        value: '10',
        currency: 'USD',
        method: 'Cartão de crédito',
        tag: 'Lazer',
        description: 'Dez dólares',
        exchangeRates: mockData,
      },
    ];

    await waitFor(() => {
      expect(valueInput).toContainHTML(0);
    });
    expect(store.getState().wallet.expenses).toStrictEqual(expectedStateExpense);

    userEvent.type(valueInput, '20');
    userEvent.selectOptions(currencyInput, 'EUR');
    userEvent.selectOptions(methodInput, 'Cartão de débito');
    userEvent.selectOptions(tagInput, 'Trabalho');
    userEvent.type(descriptionInput, 'Vinte euros');
    fireEvent.click(addButton);
    expect(mockedExchange).toBeCalledTimes(3);

    const expectedStateExpense2 = [
      {
        id: 0,
        value: '10',
        currency: 'USD',
        method: 'Cartão de crédito',
        tag: 'Lazer',
        description: 'Dez dólares',
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '20',
        currency: 'EUR',
        method: 'Cartão de débito',
        tag: 'Trabalho',
        description: 'Vinte euros',
        exchangeRates: mockData,
      },
    ];

    await waitFor(() => {
      expect(valueInput).toContainHTML(0);
    });
    expect(store.getState().wallet.expenses).toStrictEqual(expectedStateExpense2);

    const totalField = screen.getByTestId('total-field');
    expect(totalField).toContainHTML('187.12')
  });
});

describe('5 - [PÁGINA DA CARTEIRA] Desenvolva uma tabela com os gastos contendo as seguintes características:', () => {
  const initial = initialStateWithExpenses;

  test('A tabela deve possuir um cabeçalho com os campos Descrição, Tag, Método de pagamento, Valor, Moeda, Câmbio utilizado, Valor convertido e Moeda de conversão', () => {
    renderWithRouterAndStore(<Wallet />, '/carteira', initial);
    const thDescricao = screen.getByText('Descrição');
    const thTag = screen.getByText('Tag');
    const thMetodo = screen.getByText('Método de pagamento');
    const thValor = screen.getByText('Valor');
    const thMoeda = screen.getByText('Moeda');
    const thCambio = screen.getByText('Câmbio utilizado');
    const thValorConvertido = screen.getByText('Valor convertido');
    const thMoedaConversao = screen.getByText('Moeda de conversão');
    const thEditarExcluir = screen.getByText('Editar/Excluir');

    expect(thDescricao).toBeInTheDocument();
    expect(thTag).toBeInTheDocument();
    expect(thMetodo).toBeInTheDocument();
    expect(thValor).toBeInTheDocument();
    expect(thMoeda).toBeInTheDocument();
    expect(thCambio).toBeInTheDocument();
    expect(thValorConvertido).toBeInTheDocument();
    expect(thMoedaConversao).toBeInTheDocument();
    expect(thEditarExcluir).toBeInTheDocument();
  });

  test('A tabela deve ser alimentada pelo estado da aplicação, que estará disponível na chave expenses que vem do reducer wallet.', () => {
    renderWithRouterAndStore(<Wallet />, '/carteira', initial);
    expect(screen.getAllByRole('cell', { name: 'Dez dólares' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'Lazer' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'Cartão de crédito' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: '10' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'Dólar Comercial' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: '5.58' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: '55.75' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'Real' })[0]).toBeInTheDocument();

    expect(screen.getAllByRole('cell', { name: 'Vinte euros' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'Trabalho' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'Dinheiro' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: '20' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'Euro' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: '6.57' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: '131.37' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'Real' })[1]).toBeInTheDocument();
  });
});

describe('6 - [PÁGINA DA CARTEIRA] Crie um botão para deletar uma despesa da tabela contendo as seguintes características:', () => {
  const initial = initialStateWithExpenses;

  test('O botão deve estar dentro do último item da linha da tabela e deve possuir `data-testid="delete-btn"`', () => {
    renderWithRouterAndStore(<Wallet />, '/carteira', initial);
    expect(screen.getAllByTestId('delete-btn')[0]).toBeInTheDocument();
  });

  test('Ao ser clicado, o botão deleta a linha da tabela, alterando o estado global.', () => {
    const { store } = renderWithRouterAndStore(<Wallet />, '/carteira', initial);
    const deleteBtn = screen.getAllByTestId('delete-btn')[0];
    fireEvent.click(deleteBtn);

    expect(screen.getByRole('cell', { name: 'Vinte euros' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Trabalho' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Dinheiro' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '20' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Euro' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '6.57' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '131.37' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Real' })).toBeInTheDocument();
    const newExpenses = [
      {
        id: 1,
        value: '20',
        currency: 'EUR',
        method: 'Dinheiro',
        tag: 'Trabalho',
        description: 'Vinte euros',
        exchangeRates: mockData,
      },
    ];

    expect(store.getState().wallet.expenses).toStrictEqual(newExpenses);
  });
});

describe('7 - [BÔNUS] Crie um botão para editar uma despesa da tabela contendo as seguintes características:', () => {
  const initial = initialStateWithExpenses;

  test('O botão deve estar dentro do último item da linha da tabela e deve possuir `data-testid="edit-btn"`', () => {
    renderWithRouterAndStore(<Wallet />, '/carteira', initial);
    expect(screen.getAllByTestId('edit-btn')[0]).toBeInTheDocument();
  });

  test('Ao ser clicado, o botão habilita um formulário para editar a linha da tabela. Ao clicar em "Editar despesa" ela é atualizada, alterando o estado global.', async () => {
    const { store } = renderWithRouterAndStore(<Wallet />, '/carteira', initial);
    const toggleEditBtn = screen.getAllByTestId('edit-btn')[0];
    fireEvent.click(toggleEditBtn);

    const valueInput = await screen.findByTestId('value-input');
    const currencyInput = await screen.findByTestId('currency-input');
    const methodInput = await screen.findByTestId('method-input');
    const tagInput = await screen.findByTestId('tag-input');
    const descriptionInput = await screen.findByTestId('description-input');
    const editButton = await screen.findByText(/Editar despesa/i);

    userEvent.type(valueInput, '100');
    userEvent.selectOptions(currencyInput, 'CAD');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Trabalho');
    userEvent.type(descriptionInput, 'Cem dólares canadenses');

    fireEvent.click(editButton);

    await waitFor(() => {
      expect(
        screen.getByRole('cell', { name: 'Cem dólares canadenses' })
      ).toBeInTheDocument();
    });

    expect(screen.getAllByRole('cell', { name: 'Trabalho' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'Dinheiro' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: '100' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'Dólar Canadense' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: '4.20' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: '420.41' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'Real' })[0]).toBeInTheDocument();

    const newExpenses = [
      {
        id: 0,
        value: '100',
        currency: 'CAD',
        method: 'Dinheiro',
        tag: 'Trabalho',
        description: 'Cem dólares canadenses',
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '20',
        currency: 'EUR',
        method: 'Dinheiro',
        tag: 'Trabalho',
        description: 'Vinte euros',
        exchangeRates: mockData,
      },
    ];

    expect(store.getState().wallet.expenses).toStrictEqual(newExpenses);
  });
});
