/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable react/display-name */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { TextPostUpdation } from '../TextPostUpdation';

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  debounce: (fn) => {
    fn.cancel = jest.fn();
    return fn;
  },
}));

jest.mock('../../../old/lib/utilities/Imgur/getStringFromFile', () => ({
  ...jest.requireActual('../../../old/lib/utilities/Imgur/getStringFromFile'),
  getStringFromFile: () => Promise.resolve(),
}));

jest.mock('../../../old/lib/utilities/Imgur/uploadImageToImgur', () => ({
  ...jest.requireActual('../../../old/lib/utilities/Imgur/uploadImageToImgur'),
  uploadImageToImgur: () =>
    Promise.resolve({
      data: {
        status: 200,
        data: {
          link: 'hello.png',
        },
      },
    }),
}));

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

    origins: [{ id: 1, name: 'Думка експерта', parameter: null }],
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
      data: {
        id: 105,
      },
    }),
}));

describe('TextPostUpdation tests', () => {
  let component;

  const textPostUpdationMocks = {
    pageTitle: 'Редагування допису',
    titleInputLabel: 'Заголовок допису:',
    contentInputLabel: 'Текст допису:',
    editorToolbar: () => <div />,
    post: {
      id: 105,
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
      type: { id: 3, name: 'Допис' },
      createdAt: '6.07.2021',
      publishedAt: '6.07.2021',
      origins: [{ id: 1, name: 'Думка експерта', parameter: null }],
      preview:
        'Чи небезпечний COVID-19 для дітей?Чи небезпечний COVID-19 для дітей?',
    },
  };

  beforeEach(async () => {
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

    await waitFor(
      () =>
        new Promise((resolve) => {
          resolve();
        }, 0),
    );
  });

  it('should render component', () => {
    const { asFragment } = component;

    expect(asFragment()).toMatchSnapshot();
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
    const authorInput = screen.getByPlaceholderText('Choose some author');

    userEvent.clear(authorInput);
    userEvent.type(authorInput, 'Олена Шевченко');

    await waitFor(() =>
      expect(screen.getByTestId('authors-table')).toBeInTheDocument(),
    );

    expect(screen.getByTestId('row')).toHaveTextContent('Олена');
    expect(screen.getByTestId('row')).toHaveTextContent('Шевченко');
  });

  it('should render author table', async () => {
    const authorInput = screen.getByPlaceholderText('Choose some author');

    userEvent.clear(authorInput);
    userEvent.type(authorInput, 'Олена Шевченко');

    await waitFor(() =>
      expect(screen.getByTestId('authors-table')).toBeInTheDocument(),
    );
    const authorRow = screen.getByTestId('row');
    userEvent.click(authorRow);
    expect(screen.queryByTestId('authors-table')).not.toBeInTheDocument();
  });

  it('should not render author', async () => {
    const authorInput = screen.getByPlaceholderText('Choose some author');

    userEvent.clear(authorInput);

    await waitFor(() =>
      expect(screen.queryByTestId('authors-table')).not.toBeInTheDocument(),
    );
  });

  it('should render direction checkboxes', async () => {
    const checkboxDirection = screen
      .getAllByTestId('checkbox')[0]
      .querySelector('input[type="checkbox"]');

    userEvent.click(checkboxDirection);

    await waitFor(() => expect(checkboxDirection).toBeChecked());
  });

  it('should render origin checkboxes', async () => {
    const checkboxOrigin = screen
      .getAllByTestId('checkbox')[1]
      .querySelector('input[type="checkbox"]');

    userEvent.click(checkboxOrigin);

    await waitFor(() => expect(checkboxOrigin).not.toBeChecked());
  });

  it('should render image upload', async () => {
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    const imageLoader = screen.getAllByTestId('file-input')[0];

    userEvent.upload(imageLoader, file);

    await waitFor(() => expect(imageLoader.files[0]).toStrictEqual(file));
    expect(imageLoader.files).toHaveLength(1);
  });

  it('should cancel button work properly', async () => {
    const cancelButton = screen.getByText('Відмінити редагування');
    userEvent.click(cancelButton);
    expect(screen.getByTestId('confirmation-modal')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('confirmation-button'));

    await waitFor(() => expect(mockHistoryGoBack).toHaveBeenCalled());
  });

  it('should save button work properly', async () => {
    const saveButton = screen.getByText('Зберегти');
    userEvent.click(saveButton);

    await waitFor(() =>
      expect(mockHistoryPush).toHaveBeenCalledWith(`/posts/105`),
    );
  });

  it('should preview button work properly', async () => {
    const previewButton = screen.getByText('Попередній перегляд');
    userEvent.click(previewButton);

    const backToPreviewButton = screen.getByText('Назад до редагування');
    await waitFor(() => expect(backToPreviewButton).toBeInTheDocument());
    userEvent.click(backToPreviewButton);

    await waitFor(() => expect(previewButton).toBeInTheDocument());
  });
});
