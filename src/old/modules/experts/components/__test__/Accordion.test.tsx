import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Accordion from '../Accordion';

const propsMock = {
  email: 'masha@mail.com',
  phone: '+380956456969',
  socialNetwork: 'https://www.youtube.com',
};

const propsIncompleteMock = {
  phone: '+380956456969',
};

describe('Accordion tests', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Accordion expert={propsMock} />
      </MemoryRouter>,
    );
  });

  it('should render closed accordion', () => {
    expect(screen.getByText('Показати контакти')).toBeInTheDocument();
  });

  it('should show contact info', () => {
    const showButton = screen.getByText('Показати контакти');
    fireEvent.click(showButton);
    expect(screen.getByText('masha@mail.com')).toBeInTheDocument();
  });

  it('should show and hide contact info by click', () => {
    const showButton = screen.getByText('Показати контакти');
    fireEvent.click(showButton);
    fireEvent.click(showButton);
    expect(screen.queryByText('Сховати контакти')).toBeNull();
  });
});

describe('Accordion test with incomplete props data', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Accordion expert={propsIncompleteMock} />
      </MemoryRouter>,
    );
  });

  it('should not render email', () => {
    expect(screen.queryByText('masha@mail.com')).toBeNull();
  });

  it('should not render social network link', () => {
    expect(screen.queryByText('https://www.youtube.com')).toBeNull();
  });
});
