import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import { store } from '../../../../../models/store';
import { IPost, LoadingStatusEnum } from '../../../../lib/types';
import PostView from '../PostView';
import { IUserState } from '../../../../../models/user/types';

const MOCK_USER = {
  loading: LoadingStatusEnum.idle,
  error: null,
  data: {
    id: 1,
    bio: 'Lorem ipsum dolor sit amet',
    avatar: 'https://i.imgur.com/I80W1Q0.png',
    firstName: 'Іван',
    lastName: 'Іванов',
    mainInstitution: {
      city: {
        id: 1,
        name: 'Київ',
      },
      id: 1,
      name: 'Адоніс',
    },
  },
};
const TRANSLATION_POST_MOCK: IPost = {
  author: {
    id: 1,
    bio: 'Lorem ipsum dolor sit amet',
    avatar: 'https://i.imgur.com/I80W1Q0.png',
    firstName: 'Іван',
    lastName: 'Іванов',
    mainInstitution: {
      city: {
        id: 1,
        name: 'Київ',
      },
      id: 1,
      name: 'Адоніс',
    },
  },
  publishedAt: '11.09.2020',
  createdAt: '27.11.2020',
  title: 'Ultrices eros in cursus',
  directions: [
    {
      id: 1,
      color: 'red',
      name: 'Хірургія',
    },
  ],
  type: {
    id: 1,
    name: 'Стаття',
  },
  preview: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
  content: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
  id: 10,
  origins: [
    {
      id: 3,
      name: 'Переклад',
      parameter: null,
    },
  ],
};
const MEDIA_POST_MOCK: IPost = {
  author: {
    id: 1,
    bio: 'Lorem ipsum dolor sit amet',
    avatar: 'https://i.imgur.com/I80W1Q0.png',
    firstName: 'Іван',
    lastName: 'Іванов',
    mainInstitution: {
      city: {
        id: 1,
        name: 'Київ',
      },
      id: 1,
      name: 'Адоніс',
    },
  },
  publishedAt: '11.09.2020',
  createdAt: '27.11.2020',
  title: 'Ultrices eros in cursus',
  directions: [
    {
      id: 1,
      color: 'red',
      name: 'Хірургія',
    },
  ],
  type: {
    id: 1,
    name: 'Стаття',
  },
  preview: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
  content: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
  id: 10,
  origins: [
    {
      id: 2,
      name: 'Медитека',
      parameter: null,
    },
  ],
};
const EXPERT_OPINION_POST_MOCK: IPost = {
  author: {
    id: 1,
    bio: 'Lorem ipsum dolor sit amet',
    avatar: 'https://i.imgur.com/I80W1Q0.png',
    firstName: 'Іван',
    lastName: 'Іванов',
    mainInstitution: {
      city: {
        id: 1,
        name: 'Київ',
      },
      id: 1,
      name: 'Адоніс',
    },
  },
  publishedAt: '11.09.2020',
  createdAt: '27.11.2020',
  title: 'Ultrices eros in cursus',
  directions: [
    {
      id: 1,
      color: 'red',
      name: 'Хірургія',
    },
  ],
  type: {
    id: 1,
    name: 'Стаття',
  },
  preview: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
  content: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
  id: 9,
  origins: [
    {
      id: 1,
      name: 'Думка експерта',
      parameter: null,
    },
  ],
};
const VIDEO_POST_MOCK: IPost = {
  author: {
    id: 1,
    bio: 'Lorem ipsum dolor sit amet',
    avatar: 'https://i.imgur.com/I80W1Q0.png',
    firstName: 'Іван',
    lastName: 'Іванов',
    mainInstitution: {
      city: {
        id: 1,
        name: 'Київ',
      },
      id: 1,
      name: 'Адоніс',
    },
  },
  publishedAt: '11.09.2020',
  createdAt: '27.11.2020',
  title: 'Ultrices eros in cursus',
  directions: [
    {
      id: 1,
      color: 'red',
      name: 'Хірургія',
    },
  ],
  type: {
    id: 2,
    name: 'Відео',
  },
  preview: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
  content: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
  id: 11,
  origins: [
    {
      id: 2,
      name: 'Медитека',
      parameter: null,
    },
  ],
};
const DEFAULT_POST_MOCK: IPost = {
  author: {
    id: 1,
    bio: 'Lorem ipsum dolor sit amet',
    avatar: 'https://i.imgur.com/I80W1Q0.png',
    firstName: 'Іван',
    lastName: 'Іванов',
    mainInstitution: {
      city: {
        id: 1,
        name: 'Київ',
      },
      id: 1,
      name: 'Адоніс',
    },
  },
  publishedAt: '11.09.2020',
  createdAt: '27.11.2020',
  title: 'Ultrices eros in cursus',
  directions: [
    {
      id: 1,
      color: 'red',
      name: 'Хірургія',
    },
  ],
  type: {
    id: 5,
    name: 'lorem',
  },
  preview: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
  content: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
  id: 11,
  origins: [
    {
      id: 4,
      name: 'lorem',
      parameter: null,
    },
  ],
};
const DEFAULT_POST_WITHOUT_POSTCONTENT_MOCK: IPost = {
  author: {
    id: 1,
    bio: 'Lorem ipsum dolor sit amet',
    avatar: 'https://i.imgur.com/I80W1Q0.png',
    firstName: 'Іван',
    lastName: 'Іванов',
    mainInstitution: {
      city: {
        id: 1,
        name: 'Київ',
      },
      id: 1,
      name: 'Адоніс',
    },
  },
  publishedAt: '11.09.2020',
  createdAt: '27.11.2020',
  title: 'Ultrices eros in cursus',
  directions: [
    {
      id: 1,
      color: 'red',
      name: 'Хірургія',
    },
  ],
  type: {
    id: 5,
    name: 'lorem',
  },
  preview: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
  content: null,
  id: 11,
  origins: [
    {
      id: 4,
      name: 'lorem',
      parameter: null,
    },
  ],
};

const history = createMemoryHistory();
const deleteHandler = jest.fn();

describe('PostView component test', () => {
  it('should render when post has no content ', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PostView post={DEFAULT_POST_WITHOUT_POSTCONTENT_MOCK} />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText('There is no post content')).toBeInTheDocument();
  });
});

describe('edit and delete button should be available', () => {
  beforeEach(() => {
    const mockInitialState: IUserState = MOCK_USER;
    const mockSignInSlice = createSlice({
      name: 'mockSignIn',
      initialState: mockInitialState,
      reducers: {},
    });

    const mockStore = configureStore({
      reducer: combineReducers({ currentUser: mockSignInSlice.reducer }),
    });
    render(
      <Provider store={mockStore}>
        <Router history={history}>
          <PostView post={DEFAULT_POST_MOCK} onDelete={deleteHandler} />
        </Router>
      </Provider>,
    );
  });

  it('link to edit this post should be available', () => {
    const editorLink = screen.getByTestId('editor link');
    userEvent.click(editorLink);
    expect(
      history.entries[1].pathname === '/edit-post' &&
        history.entries[1].search === '?id=11',
    ).toBeTruthy();
  });

  it('delete button should be available', () => {
    const deleteButton = screen.getByTestId('delete button');
    userEvent.click(deleteButton);
    expect(
      screen.getByText(
        "Ви дійсно бажаєте безповоротно видалити матеріал 'Ultrices eros in cursus'?",
      ),
    ).toBeInTheDocument();
  });
});

describe('PostView component renders', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PostView post={DEFAULT_POST_MOCK} />
        </MemoryRouter>
      </Provider>,
    );
  });
  it('renders breadcrumbs', () => {
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
  it("renders Expert's name", () => {
    expect(screen.getByText('Іван Іванов')).toBeInTheDocument();
  });
  it("renders Expert's bio", () => {
    expect(screen.getByText('Lorem ipsum dolor sit amet')).toBeInTheDocument();
  });
  it("renders Expert's image", () => {
    expect(screen.getByTitle('Іван Іванов')).toBeInTheDocument();
  });
});

describe('PostView component renders video post', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PostView post={VIDEO_POST_MOCK} />
        </MemoryRouter>
      </Provider>,
    );
  });
  it('renders video post', () => {
    const items = screen.getAllByText('Відео');
    expect(items.length).toBe(2);
    expect(items[0]).toBeInTheDocument();
  });
});

describe('PostView component renders expert opinion post', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PostView post={EXPERT_OPINION_POST_MOCK} />
        </MemoryRouter>
      </Provider>,
    );
  });
  it('renders expert opinion post', () => {
    const items = screen.getAllByText('Думка експерта');
    expect(items[0]).toBeInTheDocument();
    expect(items.length).toBe(2);
  });
});

describe('PostView component renders media post', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PostView post={MEDIA_POST_MOCK} />
        </MemoryRouter>
      </Provider>,
    );
  });
  it('renders media post', () => {
    const items = screen.getAllByText('Медитека');
    expect(items[0]).toBeInTheDocument();
    expect(items.length).toBe(2);
  });
});

describe('PostView component renders translation post', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PostView post={TRANSLATION_POST_MOCK} />
        </MemoryRouter>
      </Provider>,
    );
  });
  it('renders translation post', () => {
    const items = screen.getAllByText('Переклад');
    expect(items[0]).toBeInTheDocument();
    expect(items.length).toBe(2);
  });
});
