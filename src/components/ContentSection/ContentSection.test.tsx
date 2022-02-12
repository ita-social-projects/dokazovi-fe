import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';
import { act } from "react-dom/test-utils";
import userEvent from '@testing-library/user-event';
import ContentSection from './ContentSection';
import { PlatformInformationType } from '../../old/lib/utilities/API/types';
import { AuthContext } from '../../old/provider/AuthProvider/AuthContext';
import {
  ConditionsContentSectionEnum,
  LoadingStatusEnum,
} from '../../old/lib/types';

const info : PlatformInformationType  = {
    id: ConditionsContentSectionEnum.ABOUT,
  title: 'test title',
  text: `<p>test1</p>`,
};

jest.mock('../../old/provider/AuthProvider/AuthContext', () => ({
  ...jest.requireActual('../../old/provider/AuthProvider/AuthContext'),
  checkPermission: () => (true),
}));

const mockInitialState: IInfoState = { 1: {
    loading: LoadingStatusEnum.succeeded,
    error: null,
    data: info
  },
  isFetchedAll: true
  };

const mockInfoSlice = createSlice({
      name: 'conditions',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      initialState: mockInitialState,
      reducers: {},
    });

const mockStore = configureStore({
      reducer: combineReducers({ info: mockInfoSlice.reducer }),
});

global.document.execCommand = jest.fn();

describe ('ContentSection test', ()=>{

  it('should render ContentSection component', async() => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ContentSection type={ConditionsContentSectionEnum.ABOUT}/>
        </MemoryRouter>
      </Provider>
    );
    const text = await  screen.findByText(/test1/i);
    expect(text).toBeInTheDocument();
    const title = await  screen.findByText(/test title/i);
    expect(title).toBeInTheDocument();
  });

  describe ('Render contentSection as admin', () => {
    beforeEach (() => {
      const mockUser = { checkPermission: () => true };
      // act(() => {;
        render(
          <Provider store={mockStore}>
            <AuthContext.Provider value ={mockUser}>
              <MemoryRouter>
                <ContentSection type={ConditionsContentSectionEnum.ABOUT}/>
              </MemoryRouter>
            </AuthContext.Provider>
          </Provider>
        );
      // });
    });

    it('Edit button shoud be shown', async () => {
        const editButton = await screen.findByTestId("editIcon");
        expect(editButton).toBeInTheDocument();
    });
    
    it('EditButton shoud open editor', async () => {
      userEvent.click( await screen.findByTestId("editIcon"));
      const editor = await screen.findByTestId("text-editor_test");
      expect(editor).toBeInTheDocument();
    });
    it('EditButton shoud open editor', async () => {
      userEvent.click( await screen.findByTestId("editIcon"));
      fireEvent.change(await screen.findByText(/test1/i), { target: { textContent: '<p>test2</p>'  } });
      fireEvent.click(await screen.findByText(/Попередній/i));
      expect(screen.getByText(/test2/i).toBeInTheDocument);
    });
  });
});



