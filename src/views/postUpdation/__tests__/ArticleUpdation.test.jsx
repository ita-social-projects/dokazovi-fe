import React from 'react';
import { render, screen } from '@testing-library/react';
import { ArticleUpdation } from '../ArticleUpdation';

jest.mock('react-redux', () => ({
  useSelector: () => {
    return { data: 'SET_IMPORTANCE' };
  },
}));

global.document.execCommand = jest.fn();

describe('ArticleUpdation tests', () => {
  const postMocks = {
    id: 8,
    title: 'Як підготуватися до вакцинації',
    content:
      '<p>https://st2.depositphotos.com/1064024/10755/i/950/depositphotos_107559180-stock-photo-little-boy-illustration.jpghttps://st2.depositphotos.com/1064024/10755/i/950/depositphotos_107559180-stock-photo-little-boy-illustration.jpghttps://st2.depositphotos.com/1064024/10755/i/950/depositphotos_107559180-stock-photo-little-boy-illustration.jpghttps://st2.depositphotos.com/1064024/10755/i/950/depositphotos_107559180-stock-photo-little-boy-illustration.jpghttps://st2.depositphotos.com/1064024/10755/i...',
    author: {
      firstName: 'Bill',
      id: 56,
      lastName: 'Yamamoto',
      mainInstitution: {
        city: {
          id: 190,
          name: 'Київ',
        },
        id: 10,
        name: 'UNICEF Ukraine',
      },
    },
    directions: [{ id: 7, name: 'pediatrics' }],
    type: { id: 1, name: 'Стаття' },
    createdAt: '25.10.2021',
    publishedAt: '25.10.2021',
    origins: [{ id: 1, name: 'Думка експерта', parameter: null }],
    preview:
      'cvj;qdksjn;ckjnqsd;jkcvnq;sjdhcfn;wejqnhc;vksdnc;jkasdn;jkfd;skcn',
  };

  it('should ArticleUpdation render', () => {
    const { asFragment } = render(<ArticleUpdation post={postMocks} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render main containers', () => {
    render(<ArticleUpdation post={postMocks} />);

    expect(screen.getByText('Заголовок статті:')).toBeInTheDocument();
    expect(screen.getByText('Фонове зображення')).toBeInTheDocument();
    expect(screen.getByText('Текст статті:')).toBeInTheDocument();
  });
});
