import React from 'react';
import { render, screen, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SecondTopSection, { ISecondTopSection } from '../SecondTopSection';

const secondTopSectionMocks: ISecondTopSection = {
  author: {
    firstName: 'Bill',
    id: 56,
    lastName: 'Yamamoto',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  origin: 3,
};

describe('SecondTopSection renders with main block', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(
      <BrowserRouter>
        <SecondTopSection
          author={secondTopSectionMocks.author}
          origin={secondTopSectionMocks.origin}
        />
      </BrowserRouter>,
    );
  });

  it('should SecondTopSection component render correctly', () => {
    const { asFragment } = component;

    expect(asFragment()).toMatchSnapshot();
  });

  it('should main block be in SecondTopSection component', () => {
    expect(screen.getByTestId('block')).toBeInTheDocument();
  });
});

describe('SecondTopSection renders with origin not equal to 3', () => {
  it('should origin not equal to 3', () => {
    delete secondTopSectionMocks.origin;

    const { asFragment } = render(
      <BrowserRouter>
        <SecondTopSection
          author={secondTopSectionMocks.author}
          origin={secondTopSectionMocks.origin}
        />
      </BrowserRouter>,
    );

    expect(screen.getByTestId('link')).toBeInTheDocument();
    expect(screen.getByTestId('typography')).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });
});
