import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { INewestPostsListProps, NewestPostsList } from './NewestPostsList';
import { LoadingStatusEnum } from '../../../old/lib/types';

const PROPS_MOCK: INewestPostsListProps = {
  postsListTitle: 'Медитека',
  postsListPath: 'materials?origins=2',
  postsList: [
    {
      author: {
        id: 1,
        bio: 'Dolor sit amet consectetur adipiscing elit ut aliquam purus',
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
      publishedAt: '09.11.2020 13:25',
      createdAt: '27.11.2020',
      title: 'Some Test Title',
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
    },
  ],
  loadingStatus: LoadingStatusEnum.succeeded,
};

beforeEach(() => {
  render(
    <MemoryRouter>
      <NewestPostsList
        postsListTitle={PROPS_MOCK.postsListTitle}
        postsListPath={PROPS_MOCK.postsListPath}
        loadingStatus={PROPS_MOCK.loadingStatus}
        postsList={PROPS_MOCK.postsList}
      />
    </MemoryRouter>,
  );
});

describe('NewestPostsList', () => {
  it('should render NewestPostsList component', () => {
    expect(
      document.querySelector('.NewestPostsList-container-1'),
    ).toBeInTheDocument();
  });

  it('should be named "Медитека"', () => {
    const header = document.querySelector('.NewestPostsList-header-20');
    expect(header?.innerHTML).toContain('Медитека');
  });

  it('should contain Post Card with title', () => {
    expect(screen.getByText('Some Test Title')).toBeInTheDocument();
  });

  it('should contain Post Card with preview', () => {
    expect(
      screen.getByText(
        'Dolor sit amet consectetur adipiscing elit ut aliquam purus.',
      ),
    ).toBeInTheDocument();
  });

  it('should contain Post Card with correct date', () => {
    expect(screen.getByText('11 вересня')).toBeInTheDocument();
  });
});
