import React from 'react';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PostAuthorSelection } from './PostAuthorSelection';

const onAuthorTableClick = () => {};
const authors = [
  {
    avatar: 'abc',
    firstName: 'Max',
    id: 1,
    lastAddedPost: {
      id: 11,
      title: 'about',
    },
    lastName: 'Petrenko',
    mainDirection: {
      id: 11,
      name: 'flue',
    },
    mainInstitution: {
      city: {
        id: 11,
        name: 'Kyiv',
      },
      id: 11,
      name: 'Bolnitsa #4',
    },
    qualification: 'Therapist',
  },
  {
    avatar: 'abc',
    firstName: 'Tax',
    id: 2,
    lastAddedPost: {
      id: 11,
      title: 'about',
    },
    lastName: 'Ivanov',
    mainDirection: {
      id: 11,
      name: 'flue',
    },
    mainInstitution: {
      city: {
        id: 11,
        name: 'Kyiv',
      },
      id: 11,
      name: 'Bolnitsa #4',
    },
    qualification: 'Therapist',
  },
  {
    avatar: 'abc',
    firstName: 'Pax',
    id: 3,
    lastAddedPost: {
      id: 11,
      title: 'about',
    },
    lastName: 'Avdeev',
    mainDirection: {
      id: 11,
      name: 'flue',
    },
    mainInstitution: {
      city: {
        id: 11,
        name: 'Kyiv',
      },
      id: 11,
      name: 'Bolnitsa #4',
    },
    qualification: 'Therapist',
  },
];

describe('PostAuthorSeclection', () => {
  afterEach(cleanup);

  it('show authors lastnames recieved from props', () => {
    const { getAllByTestId } = render(
      <PostAuthorSelection
        authors={authors}
        onAuthorTableClick={onAuthorTableClick}
        handleOnChange={() => {}}
      />,
    );
    const authorNames = getAllByTestId('item').map((tc) => tc.textContent);
    const fakeAuthorNames = authors.map((author) => author.lastName);
    expect(authorNames).toEqual(fakeAuthorNames);
  });

  it('render table once author existed', async () => {
    const handleOnChangeMock = jest.fn();
    render(
      <PostAuthorSelection
        authors={authors}
        searchValue="Ivan"
        onAuthorTableClick={onAuthorTableClick}
        handleOnChange={handleOnChangeMock}
      />,
    );
    screen.debug();
    expect(screen.queryByText(/first name/i));
    expect(await screen.findByText(/first name/i));
  });

  describe('When the input value is changed', () => {
    it('handle input changes having an appropriate value', () => {
      const handleOnChangeMock = jest.fn();
      const { getByPlaceholderText } = render(
        <PostAuthorSelection
          authors={authors}
          searchValue="Ivan"
          onAuthorTableClick={onAuthorTableClick}
          handleOnChange={handleOnChangeMock}
        />,
      );
      screen.debug();
      const input = getByPlaceholderText(
        'Choose some author',
      ) as HTMLInputElement;
      fireEvent.change(input);
      expect(input.value).toBe('Ivan');
    });

    it('invokes handleOnChange function', () => {
      const handleOnChangeMock = jest.fn();
      const { getByPlaceholderText } = render(
        <PostAuthorSelection
          authors={authors}
          searchValue="Ivan"
          onAuthorTableClick={onAuthorTableClick}
          handleOnChange={handleOnChangeMock}
        />,
      );
      screen.debug();
      const input = getByPlaceholderText(
        'Choose some author',
      ) as HTMLInputElement;
      userEvent.type(input, 'o');
      expect(handleOnChangeMock).toBeCalled();
    });

    it('handle input changes', () => {
      const handleOnChangeMock = jest.fn();
      const { getByRole, rerender } = render(
        <PostAuthorSelection
          authors={[]}
          searchValue=""
          onAuthorTableClick={onAuthorTableClick}
          handleOnChange={handleOnChangeMock}
        />,
      );
      screen.debug();
      const input = getByRole('textbox') as HTMLInputElement;
      userEvent.type(input, 'I');
      const newAuthors = authors.filter((item) => item.lastName.includes('I'));
      rerender(
        <PostAuthorSelection
          authors={newAuthors}
          searchValue="I"
          onAuthorTableClick={onAuthorTableClick}
          handleOnChange={handleOnChangeMock}
        />,
      );
      expect(screen.queryByText('Ivanov')).toBeInTheDocument();
    });
  });
});
