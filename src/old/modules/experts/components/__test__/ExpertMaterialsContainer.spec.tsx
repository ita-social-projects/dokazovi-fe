import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ExpertMaterialsContainer from '../ExpertMaterialsContainer';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { LoadMoreButton } from '../../../../lib/components/LoadMoreButton/LoadMoreButton';
import {
  LoadingStatusEnum,
  LoadMoreButtonTextType,
} from '../../../../lib/types';
import userEvent from '@testing-library/user-event';
import * as reactRedux from 'react-redux';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

const post = {
  id: 16,
  title: 'Ninth therapy post',
  preview: null,
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  videoUrl: '',
  previewImageUrl: '',
  author: {
    id: 10,
    firstName: 'Марія',
    lastName: 'Марієнко',
    avatar: 'https://i.pravatar.cc/300?img=16',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    mainInstitution: {
      id: 5,
      name: 'Medical Idea',
      city: {
        id: 55,
        name: 'Бровари',
      },
    },
  },
  directions: [
    {
      id: 7,
      name: 'pediatrics',
      label: 'Педіатрія',
      color: '#993333',
      hasDoctors: true,
      hasPosts: true,
    },
    {
      id: 1,
      name: 'covid-19',
      label: 'Covid-19',
      color: '#ef5350',
      hasDoctors: true,
      hasPosts: true,
    },
    {
      id: 4,
      name: 'therapy',
      label: 'Терапія',
      color: '#ffee58',
      hasDoctors: true,
      hasPosts: true,
    },
  ],
  tags: [],
  type: {
    id: 1,
    name: 'Стаття',
  },
  createdAt: '14.12.2020',
  modifiedAt: '14.12.2020',
  publishedAt: '01.06.2021',
  origins: [
    {
      id: 2,
      name: 'Медитека',
      parameter: null,
    },
  ],
};

const postsArray = new Array(12).fill(post);
const posts = postsArray.reduce(
  (result, item, idx) => ({ ...result, [idx]: item }),
  {},
);

const store = mockStore({
  experts: {
    error: 'Server Error',
    posts: {
      data: {
        meta: { isLastPage: false },
        posts: posts,
      },
    },
  },
  properties: {
    postTypes: [
      { id: 1, name: 'Стаття' },
      { id: 2, name: 'Відео' },
      { id: 3, name: 'Допис' },
    ],
  },
});

const loadMore = jest.fn();

beforeEach(() => {
  render(
    <Provider store={store}>
      <Router history={history}>
        <ExpertMaterialsContainer expertId={10}>
          <LoadMoreButton
            clicked={loadMore}
            textType={LoadMoreButtonTextType.POST}
            loading={LoadingStatusEnum.idle}
            isLastPage={false}
            totalPages={2}
            totalElements={18}
            pageNumber={0}
          />
        </ExpertMaterialsContainer>
      </Router>
    </Provider>,
  );
});

describe('ExpertMaterialsContainer testing with store data', () => {
  // const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  // const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
  //
  // beforeEach(() => {
  //     useSelectorMock.mockClear();
  //     useDispatchMock.mockClear();
  // });

  it('Headings name should be "Матеріали"', () => {
    const heading = screen.getByText(/Матеріали/i);
    expect(heading).toBeInTheDocument();
  });
  it('Headings name should be "Матеріали" (testing with another way)', () => {
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <ExpertMaterialsContainer expertId={10} />
        </Router>
      </Provider>,
    );
    const heading = container.getElementsByTagName('h4');
    expect(heading[0].innerHTML).toMatch(/Матеріали/i);
    expect(heading[0]).toHaveTextContent(/Матеріали/i);
  });
  it('Choice types of materials with checkbox', () => {
    const [article, video, story] = screen.getAllByRole('checkbox');
    expect(article).toBeInTheDocument();
    expect(video).toBeInTheDocument();
    expect(story).toBeInTheDocument();
  });
  it('Should be only 3 checkboxes for choice materials here', () => {
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(3);
  });
  it('Check Article checkbox', () => {
    const [article, video, story] = screen.getAllByRole('checkbox');
    fireEvent.click(article);
    expect(article).toBeChecked();
  });
  it('Check Video checkbox', () => {
    const [article, video, story] = screen.getAllByRole('checkbox');
    fireEvent.click(video);
    expect(video).toBeChecked();
  });
  it('Check Story checkbox', () => {
    const [article, video, story] = screen.getAllByRole('checkbox');
    fireEvent.click(story);
    expect(story).toBeChecked();
  });
  it('button for more materials should be on the page', () => {
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
  it('name of button should be "Показати ще матеріалів"', () => {
    const button = screen.getByText(/Показати ще/i);
    expect(button).toBeInTheDocument();
  });
  it('name of button should be "Показати ще матеріалів" (another implementation)', () => {
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <ExpertMaterialsContainer expertId={10} />
        </Router>
      </Provider>,
    );
    const button = container.getElementsByTagName('button');
    expect(button[0].innerHTML).toMatch(/Показати ще/i);
  });
  it('should be 12 posts on the page', () => {
    const posts = screen.getAllByTestId('post_item');
    expect(posts.length).toBe(12);
  });
  it('click of button for more materials', () => {
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(loadMore).toHaveBeenCalledTimes(1);
  });
  it('click on button "Показати ще матеріалів"', () => {
    const button = screen.getByTestId('more_button');
    fireEvent.click(button);
    expect(loadMore).toHaveBeenCalledTimes(1);
  });
  it('click on button "Показати ще матеріалів" (another implementation)', () => {
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <ExpertMaterialsContainer expertId={10}>
            <LoadMoreButton
              clicked={loadMore}
              textType={LoadMoreButtonTextType.POST}
              loading={LoadingStatusEnum.idle}
              isLastPage={false}
              totalPages={2}
              totalElements={18}
              pageNumber={0}
            />
          </ExpertMaterialsContainer>
        </Router>
      </Provider>,
    );
    const [button1] = container.getElementsByClassName('MuiButton-root');
    fireEvent.click(button1);
    userEvent.click(button1);
    expect(loadMore).toHaveBeenCalledTimes(1);
    // expect(button[0]).toBeInTheDocument();
  });
});
