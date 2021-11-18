/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable react/display-name */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { TextPostUpdation } from '../TextPostUpdation';

const store = {
  authorities: { data: ['SET_IMPORTANCE'] },
  properties: {
    directions: [
      {
        id: 3,
        name: 'surgery',
        label: 'Хірургія',
        color: '#7aebbf',
        hasDoctors: true,
        hasPosts: true,
      },
    ],

    origins: [{ id: 2, name: 'Медитека', parameter: null }],
  },
};

const mockHistoryGoBack = jest.fn();
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    goBack: mockHistoryGoBack,
    push: mockHistoryPush,
  }),
}));

jest.mock('react-redux', () => ({
  useSelector: (cb) => {
    return cb(store);
  },
}));

global.document.execCommand = jest.fn();

// jest.mock('quill', () => () => {});
// jest.mock('quill-image-uploader', () => () => {});

jest.mock('../../../components/Editor/Editors/TextPostEditor', () => ({
  ...jest.requireActual('../../../components/Editor/Editors/TextPostEditor'),
  TextPostEditor: () => <div />,
}));

jest.mock('../../../old/lib/utilities/API/api', () => ({
  getAllExperts: () =>
    Promise.resolve({
      data: {
        content: [
          {
            avatar: 'https://i.imgur.com/k0j4vVH.png',
            bio: 'Медичний експерт ЮНІСЕФ в Україні',
            firstName: 'Олена',
            id: 56,
            lastAddedPost: {
              id: 41,
              title: 'Календар вакцинації',
            },
            lastName: 'Шевченко',
            mainDirection: {
              id: 10,
              name: 'Pediatrics',
            },
            mainInstitution: {
              city: {
                id: 190,
                name: 'Київ',
              },
              id: 10,
              name: 'UNICEF Ukraine',
            },
            qualification: 'Лікар вищої категорії',
          },
        ],
        totalElements: 2,
      },
    }),
  updatePost: () =>
    Promise.resolve({
      // data: {
      //   id: 95,
      //   content: <div />,
      //   directions: [
      //     {
      //       id: 1,
      //       name: 'Covid-19',
      //     },
      //   ],
      //   origins: [{ id: 2, name: 'Медитека', parameter: null }],
      //   preview: ' ',
      //   previewImageUrl: ' ',
      //   importantImageUrl: ' ',
      //   title: 'Діти та батьки і COVID-19 test',
      //   type: { id: 1, name: 'Стаття' },
      //   authorId: 17,
      // },
      // data: {
      //   author: {
      //     firstName: 'Олена',
      //     id: 17,
      //     lastName: 'Шевченко',
      //     mainInstitution: {
      //       city: {
      //         id: 190,
      //         name: 'Київ',
      //       },
      //       id: 1,
      //       name: 'Адоніс',
      //     },
      //   },
      //   content:
      //     '<h4>Чи небезпечний COVID-19 для дітей? Що важливо врахувати про вагітність і пологи під час пандемії?',
      //   preview:
      //     'Чи небезпечний COVID-19 для дітей?Чи небезпечний COVID-19 для дітей?',
      //   postType: { id: 2, name: ' ' },
      //   createdAt: '6.07.2021',
      //   publishedAt: '6.07.2021',
      //   directions: [{ id: 1, name: 'Covid-19' }],
      //   origins: [{ id: 2, name: 'Медитека', parameter: null }],
      //   id: 95,
      //   title: 'Діти та батьки і COVID-19 test',
      //   type: { id: 1, name: 'Стаття' },
      // },

      data: {
        id: 95,
        title: 'Діти та батьки і COVID-19 test',
        content:
          'Чи небезпечний COVID-19 для дітей? Що важливо врахувати про вагітність і пологи під час пандемії?',
        directions: [{ id: 1, name: 'Covid-19' }],
        preview:
          'Чи небезпечний COVID-19 для дітей?Чи небезпечний COVID-19 для дітей?небезпечний',
        type: { id: 1, name: 'Стаття' },
      },
    }),
}));

describe('TextPostUpdation tests', () => {
  let component;
  // afterEach(() => {
  //   jest.useRealTimers();
  // });
  const textPostUpdationMocks = {
    pageTitle: 'Редагування статті',
    titleInputLabel: 'Заголовок статті:',
    contentInputLabel: 'Текст статті:',
    editorToolbar: () => <div />,
    post: {
      id: 95,
      title: 'Діти та батьки і COVID-19',
      content:
        '<h4>Чи небезпечний COVID-19 для дітей? Що важливо врахувати про вагітність і пологи під час пандемії?',
      author: {
        firstName: 'Олена',
        id: 17,
        lastName: 'Шевченко',
        mainInstitution: {
          city: {
            id: 190,
            name: 'Київ',
          },
          id: 1,
          name: 'Адоніс',
        },
      },
      directions: [{ id: 1, name: 'Covid-19' }],
      type: { id: 1, name: 'Стаття' },
      createdAt: '6.07.2021',
      publishedAt: '6.07.2021',
      origins: [{ id: 2, name: 'Медитека', parameter: null }],
      preview:
        'Чи небезпечний COVID-19 для дітей?Чи небезпечний COVID-19 для дітей?',
    },
  };

  beforeEach(() => {
    component = render(
      <MemoryRouter>
        <TextPostUpdation
          pageTitle={textPostUpdationMocks.pageTitle}
          titleInputLabel={textPostUpdationMocks.titleInputLabel}
          contentInputLabel={textPostUpdationMocks.contentInputLabel}
          editorToolbar={textPostUpdationMocks.editorToolbar}
          post={textPostUpdationMocks.post}
        />
      </MemoryRouter>,
    );
  });

  it('should render component', () => {
    const { asFragment } = component;

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render direction checkboxes', () => {
    const checkboxDirection = screen
      .getAllByTestId('checkbox')[0]
      .querySelector('input[type="checkbox"]');

    expect(checkboxDirection).not.toBeChecked();
    userEvent.click(checkboxDirection);
    expect(checkboxDirection).toBeChecked();
  });

  it('should render origin checkboxes', () => {
    const checkboxOrigin = screen
      .getAllByTestId('checkbox')[1]
      .querySelector('input[type="checkbox"]');
    userEvent.click(checkboxOrigin);
    expect(checkboxOrigin).not.toBeChecked();
  });

  it('should render title input', async () => {
    const input = screen.getByTestId('text-field');
    userEvent.type(input, ' test');
    await waitFor(() =>
      expect(input).toHaveValue('Діти та батьки і COVID-19 test'),
    );
  });

  it('should render maximum length warning on title', () => {
    const textField = screen.getByTestId('text-field');

    userEvent.type(
      textField,
      'Діти та батьки і COVID-19 testДіти та батьки і COVID-19 testДіти та батьки і COVID-19 testДіти та батьки і COVID-19 testДіти та батьки і COVID-19 testДі',
    );

    expect(screen.getByText('Ви ввели забагато символів')).toBeInTheDocument();
  });

  it('should author search work', async () => {
    // jest.useFakeTimers('modern');

    const authorInput = screen.getByPlaceholderText('Choose some author');

    userEvent.clear(authorInput);
    userEvent.type(authorInput, 'Олена Шевченко');

    // jest.advanceTimersByTime(500);

    expect(await screen.findByTestId('authors-table')).toBeInTheDocument();
    expect(screen.getByTestId('row')).toHaveTextContent('Олена');
    expect(screen.getByTestId('row')).toHaveTextContent('Шевченко');
  });

  it('should render author table', async () => {
    const authorInput = screen.getByPlaceholderText('Choose some author');

    userEvent.clear(authorInput);
    userEvent.type(authorInput, 'Олена Шевченко');

    expect(await screen.findByTestId('authors-table')).toBeInTheDocument();
    const authorRow = screen.getByTestId('row');
    userEvent.click(authorRow);
    expect(screen.queryByTestId('authors-table')).not.toBeInTheDocument();
  });

  it('should render image upload', async () => {
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    const imageLoader = screen.getAllByTestId('file-input')[0];

    userEvent.upload(imageLoader, file);

    // expect(imageLoader.files[0]).toStrictEqual(file);
    // expect(imageLoader.files.item(0)).toStrictEqual(file);

    await waitFor(() => expect(imageLoader.files).toHaveLength(1));
  });

  it('should cancel button work properly', async () => {
    const cancelButton = screen.getByText('Відмінити редагування');
    userEvent.click(cancelButton);
    expect(screen.getByTestId('confirmation-modal')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('confirmation-button'));

    await waitFor(() => expect(mockHistoryGoBack).toHaveBeenCalled());
  });

  // it('should save button work properly', async () => {
  //   const saveButton = screen.getByText('Зберегти');
  //   userEvent.click(saveButton);

  // await waitFor(() =>
  //   expect(mockHistoryPush).toHaveBeenCalledWith(`/posts/95`),
  // );
  // });

  it('should preview button work properly', () => {
    const previewButton = screen.getByText('Попередній перегляд');
    userEvent.click(previewButton);

    const backToPreviewButton = screen.getByText('Назад до редагування');
    expect(backToPreviewButton).toBeInTheDocument();
    userEvent.click(backToPreviewButton);

    expect(previewButton).toBeInTheDocument();
  });
});
