import React from 'react';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from 'models/store';
import { Router } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import * as api from '../../../utilities/API/api';
import Swal from 'sweetalert2';
import { createMemoryHistory } from 'history';
import { LoginModal } from '../LoginModal';

const history = createMemoryHistory();

const testInputData = ['testmail@mail.com', 'testpassword'];

const mockedAxios = new MockAdapter(api.instance);

const submitLoginForm = (inputData) => {
  const openMenuButton = screen.getByRole('button', { name: 'Увійти' });
  fireEvent.click(openMenuButton);

  const inputs = screen.getAllByTestId('basic-input');
  inputs.forEach((input, i) => {
    userEvent.type(input, inputData[i]);
  });

  const submitButton = screen.getByRole('button', { name: 'Увійти' });
  fireEvent.submit(submitButton);
};

describe('LoginModal tests', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <LoginModal />
        </Router>
      </Provider>,
    );
  });

  afterEach(cleanup);

  it("should render 'Увійти' button to open LoginModal menu", () => {
    expect(screen.getByRole('button', { name: 'Увійти' })).toBeInTheDocument();
  });

  it("should open authorization menu by clicking on 'Увійти' button", () => {
    const openMenuButton = screen.getByRole('button', { name: 'Увійти' });
    fireEvent.click(openMenuButton);
    expect(screen.getAllByTestId('basic-input')).toHaveLength(2);
  });

  it("should submit authorization form after passing email and password data by clicking on 'Увійти' button", async () => {
    mockedAxios.onPost('/auth/login').replyOnce(200, {});
    const swalFireMock = jest
      .spyOn(Swal, 'fire')
      .mockResolvedValueOnce({
        isConfirmed: true,
        isDenied: false,
        isDismissed: false,
      });
    submitLoginForm(testInputData);
    await waitFor(() => {
      expect(swalFireMock).toHaveBeenCalled();
      expect(history.location.pathname).toBe('/');
    });
  });

  it('should submit authorization form with error', async () => {
    mockedAxios.onPost('/auth/login').replyOnce(500);
    const loginFn = jest
      .spyOn(api, 'login')
      .mockRejectedValueOnce({ response: { data: { status: 'Error' } } });
    submitLoginForm(testInputData);
    await waitFor(() => {
      expect(loginFn).toHaveBeenCalled();
    });
  });
});
