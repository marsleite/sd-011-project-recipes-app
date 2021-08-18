import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

const emailTest = 'email-input';
const passwordTest = 'password-input';
const loginBtnTest = 'login-submit-btn';

describe('1 -test if all login elements are in the login screen', () => {
  afterAll(() => done());

  it('test if app screen is "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    let { pathname } = history.location;
    pathname = history.location.pathname;
    expect(pathname).toBe('/');
  });

  it('test if email input is shown and works', () => {
    const { getByTestId } = renderWithRouterAndRedux(<App />);
    const email = getByTestId(emailTest);
    expect(email).toBeInTheDocument();
    userEvent.type(email, 'betrybe@trybe.com');
    expect(email).toHaveValue('betrybe@trybe.com');
  });

  it('test if password input is shown and works', () => {
    const { getByTestId } = renderWithRouterAndRedux(<App />);
    const password = getByTestId(passwordTest);
    expect(password).toBeInTheDocument();
    userEvent.type(password, 'p4ssw0rd');
    expect(password).toHaveValue('p4ssw0rd');
  });

  it('test if login button is shown and its disable', () => {
    const { getByTestId } = renderWithRouterAndRedux(<App />);
    const buttonLogin = getByTestId(loginBtnTest);
    expect(buttonLogin).toBeInTheDocument();
    expect(buttonLogin).toHaveAttribute('disabled');
  });
});

describe('2 -test if button is disable/enable', () => {
  afterAll(() => done());

  it('test if with wrong email and correct password button remains disable', () => {
    const { getByTestId } = renderWithRouterAndRedux(<App />);
    const email = getByTestId(emailTest);
    const password = getByTestId(passwordTest);
    const buttonLogin = getByTestId(loginBtnTest);
    userEvent.type(email, 'trybe@betrybecom');
    userEvent.type(password, '1234567');
    expect(buttonLogin).toBeDisabled();
  });

  it('test if with correct email and wrong password button remains disable', () => {
    const { getByTestId } = renderWithRouterAndRedux(<App />);
    const email = getByTestId(emailTest);
    const password = getByTestId(passwordTest);
    const buttonLogin = getByTestId(loginBtnTest);
    userEvent.type(email, 'trybe@betrybe.com');
    userEvent.type(password, '123456');
    expect(buttonLogin).toBeDisabled();
  });

  it('test if with correct email and password button will be enabled', () => {
    const { getByTestId } = renderWithRouterAndRedux(<App />);
    const emailInput = getByTestId(emailTest);
    const passwordInput = getByTestId(passwordTest);
    const loginButton = getByTestId(loginBtnTest);
    userEvent.type(emailInput, 'trybe@trybe.com');
    userEvent.type(passwordInput, '1234567');
    expect(loginButton).toBeEnabled();
  });
});

describe('3 - test if when button is clicked it will redirect'
+ 'to "/comidas" and save things to localStorage', () => {
  afterAll(() => done());

  it('test if button fully works', () => {
    const { getByTestId, history } = renderWithRouterAndRedux(<App />);
    let { pathname } = history.location;
    const email = getByTestId(emailTest);
    const password = getByTestId(passwordTest);
    const buttonLogin = getByTestId(loginBtnTest);
    localStorage.clear();
    userEvent.type(email, 'trybe@trybe.com');
    userEvent.type(password, '1234567');
    userEvent.click(buttonLogin);
    expect(localStorage.getItem('user')).toBe('{"email":"trybe@trybe.com"}');
    expect(localStorage.getItem('mealsToken')).toBe('1');
    expect(localStorage.getItem('cocktailsToken')).toBe('1');
    pathname = history.location.pathname;
    expect(pathname).toBe('/comidas');
    localStorage.clear();
  });
});
