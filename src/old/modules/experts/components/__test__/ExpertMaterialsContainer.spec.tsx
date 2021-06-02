import React from 'react';
import { render, screen } from '@testing-library/react';
import ExpertMaterialsContainer from '../ExpertMaterialsContainer';
import { Provider } from 'react-redux';
import { store } from '../../../../store/store';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { mainSlice } from '../../../../../models/main/reducers';
import { fetchImportantPosts } from '../../../../../models/main';
import { RootStateType } from '../../../../store/rootReducer';
import {
  expertsReducer,
  expertsSlice,
  initialState,
} from '../../../../../models/experts/reducers';
import {
  fetchExpertMaterials,
  selectExpertsData,
} from '../../../../../models/experts';
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from 'react-toastify/dist/hooks/toastContainerReducer';
import * as reactRedux from 'react-redux';
import { useSelector } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

const history = createMemoryHistory();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

beforeEach(() => {
  render(
    <Provider store={store}>
      <Router history={history}>
        <ExpertMaterialsContainer expertId={13} />
      </Router>
    </Provider>,
  );
});

const renderWithRedux = ({
  store = configureStore({ reducer: expertsReducer }),
} = {}) => {
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>
          <ExpertMaterialsContainer expertId={13} />
        </Router>
      </Provider>,
    ),
    store,
  };
};

describe('ExpertInfo testing', () => {
  // const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  // const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

  beforeEach(() => {
    // useSelectorMock.mockClear();
    // useDispatchMock.mockClear();
  });

  it('Heading should exist', () => {
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
  });
  it('Headings name should be "Матеріали"', () => {
    const heading = screen.getByText(/Матеріали/i);
    expect(heading).toBeInTheDocument();
  });
  it('Headings name should be "Матеріали" should', () => {
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <ExpertMaterialsContainer expertId={13} />
        </Router>
      </Provider>,
    );
    const heading = container.getElementsByTagName('h4');
    expect(heading[0].innerHTML).toMatch(/Матеріали/i);
    expect(heading[0]).toHaveTextContent(/Матеріали/i);
  });
  it('Choice types of materials', async () => {
    const newState = expertsSlice.reducer(initialState, {
      type: fetchExpertMaterials.fulfilled,
      payload: { data: { postIds: [1, 2, 3, 4] } },
    });

    const newStore = { ...store, ...newState };
    console.log(newStore);

    await render(
      <Provider store={newStore}>
        <Router history={history}>
          <ExpertMaterialsContainer expertId={13} />
        </Router>
      </Provider>,
    );

    // const { getAllByRole } = renderWithRedux();

    const [article, video, story] = await screen.findAllByRole('checkbox');
    expect(article).toBeInTheDocument();
    expect(video).toBeInTheDocument();
    expect(story).toBeInTheDocument();
  });
  it('Is loading error', () => {
    // const newState = expertsSlice.reducer(initialState, {
    //     type: fetchExpertMaterials.rejected,
    //     payload: new Error('Fucking error') ,
    // });
    // const newStore = {...store, ...newState};

    // useSelectorMock.mockReturnValue({
    //     experts: {
    //         error: 'Fucking error',
    //         posts: {
    //             data: {
    //                 meta: {isLastPage: false},
    //                 posts: {
    //                     id: {
    //                         title: 'xxx'
    //                     }
    //                 }
    //             }
    //         }
    //     },
    //     properties: {
    //         postTypes: [],
    //     }
    // });
    // useSelectorMock.mockReturnValue({postTypes: []});
    // useSelectorMock.mockReturnValue({meta: {isLastPage: false}, posts: {id: {title: 'xxx'}}});
    // @ts-ignore
    useSelector
      .mockImplementationOnce(() => ({
        meta: { isLastPage: false },
        posts: { id: { title: 'xxx' } },
      }))
      .mockImplementationOnce(() => ({ postTypes: [] }))
      .mockImplementationOnce(() => ({ error: 'Fucking error' }));

    // jest.mock('../../../../../models/experts/selectors.ts', () => ({
    //     selectExpertsData: jest.fn().mockReturnValue({meta: {isLastPage: false}, posts: {id: {title: 'xxx'}}}),
    //     selectErrorExperts: jest.fn().mockReturnValue('Fucking error'),
    // }));

    render(
      <Provider store={store}>
        <Router history={history}>
          <ExpertMaterialsContainer expertId={13} />
        </Router>
      </Provider>,
    );

    const error = screen.getByText(/Fucking error/i);
    expect(error).toBeInTheDocument();
  });
});
