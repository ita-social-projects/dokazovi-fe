import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TopSection, { ITopSection } from '../TopSection';

describe('TopSection tests', () => {
  const topSectionMocks: ITopSection = {
    author: {
      avatar: 'https://i.pravatar.cc/300?img=20',
      firstName: 'Єва',
      id: 35,
      lastName: 'Євенко',
      bio:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  };

  it('should TopSection Component render correctly', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <TopSection author={topSectionMocks.author} />
      </BrowserRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should main blocks be in the TopSection Component', () => {
    render(
      <BrowserRouter>
        <TopSection author={topSectionMocks.author} />
      </BrowserRouter>,
    );

    expect(screen.getByTestId('avatarSection')).toBeInTheDocument();
    expect(screen.getByTestId('infoAuthor')).toBeInTheDocument();
  });

  it('should component be without avatar', () => {
    delete topSectionMocks.author.avatar;

    const { asFragment } = render(
      <BrowserRouter>
        <TopSection author={topSectionMocks.author} />
      </BrowserRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
