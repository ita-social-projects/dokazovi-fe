import React from 'react';
import { render, screen } from '@testing-library/react';
import { NoteUpdation } from '../NoteUpdation';

jest.mock('react-redux', () => ({
  useSelector: () => {
    return { data: 'SET_IMPORTANCE' };
  },
}));

global.document.execCommand = jest.fn();

describe('NoteUpdation tests', () => {
  const noteUpdationMocks = {
    id: 114,
    title: 'Календар вакцинації',
    content:
      '<p class="ql-align-justify">На відміну від поширеної думки Lorem Ipsum не є випадковим набором літер. Він походить з уривку класичної латинської літератури 45 року до н.е., тобто має більш як 2000-річну історію. Річард Макклінток, професор латини з коледжу Хемпдін-Сидні, що у Вірджінії, вивчав одне з найменш зрозумілих латинських слів - consectetur - з уривку Lorem Ipsum, і у пошуку цього слова в класичній літературі знайшов безсумнівне джерело. Lorem Ipsum походить з розділів 1.10.32 та 1.10.33...',
    author: {
      firstName: 'Олег',
      id: 14,
      lastName: 'Петренко',
      mainInstitution: {
        city: {
          id: 55,
          name: 'Бровари',
        },
        id: 5,
        name: 'Medical Idea',
      },
    },
    directions: [{ id: 5, name: 'virology' }],
    type: { id: 3, name: 'Допис' },
    createdAt: '22.10.2021',
    publishedAt: '22.10.2021',
    origins: [{ id: 1, name: 'Думка експерта', parameter: null }],
    preview:
      'Існує багато варіацій уривків з Lorem Ipsum, але більшість з них зазнала певних змін на кшталт жартівливих вставок або змішування слів, які навіть не виглядають правдоподібно.',
  };

  it('should NoteUpdation render', () => {
    const { asFragment } = render(<NoteUpdation post={noteUpdationMocks} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render editor', () => {
    render(<NoteUpdation post={noteUpdationMocks} />);

    expect(screen.getByText('Заголовок допису:')).toBeInTheDocument();
    expect(screen.getByText('Текст допису:')).toBeInTheDocument();
    expect(
      screen.getAllByText('Текст картки матеріалу')[0],
    ).toBeInTheDocument();
  });
});
