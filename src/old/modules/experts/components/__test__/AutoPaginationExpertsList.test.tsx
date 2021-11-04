import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { IExpert } from 'old/lib/types';
import { AutoPaginationExpertsList } from '../AutoPaginationExpertsList';

const setPageFunc = jest.fn();

const EXPERTS_LIST: IExpert[] = [
  {
    id: 10,
    firstName: 'Марія',
    lastName: 'Марієнко',
    email: 'masha@mail.com',
    qualification: 'Лікар вищої категорії',
    phone: '+380956456969',
    avatar: 'https://i.pravatar.cc/300?img=16',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    socialNetwork: 'https://www.youtube.com',
    directions: [
      {
        id: 6,
        name: 'cardiology',
        label: 'Кардіологія',
        color: '#00ffff',
        hasDoctors: true,
        hasPosts: true,
      },
      {
        id: 4,
        name: 'therapy',
        label: 'Терапія',
        color: '#ffee58',
        hasDoctors: true,
        hasPosts: true,
      },
    ],
    mainInstitution: {
      id: 5,
      city: {
        id: 55,
        name: 'Бровари',
      },
      name: 'Medical Idea',
    },
    lastAddedPost: {
      id: 266,
      title: 'Офтальмонологія',
    },
  },
  {
    id: 6,
    firstName: 'Палана',
    lastName: 'Литвинова',
    email: 'PalanaLitvinova514@mail.com',
    qualification: 'Кандидат медичних наук',
    phone: '+380633484351',
    avatar: 'https://i.pravatar.cc/300?img=44',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ',
    socialNetwork: 'https://www.youtube.com',
    directions: [
      {
        id: 6,
        name: 'cardiology',
        label: 'Кардіологія',
        color: '#00ffff',
        hasDoctors: true,
        hasPosts: true,
      },
      {
        id: 4,
        name: 'therapy',
        label: 'Терапія',
        color: '#ffee58',
        hasDoctors: true,
        hasPosts: true,
      },
    ],
    mainInstitution: {
      id: 4,
      city: {
        id: 119,
        name: 'Дніпро',
      },
      name: 'Медікум',
    },
    lastAddedPost: {
      id: 246,
      title: 'Sit amet consectetur',
    },
  },
  {
    id: 6,
    firstName: 'Таржеман',
    lastName: 'Соколов',
    email: 't.sokolov@mail.com',
    qualification: 'Кандидат медичних наук',
    phone: '+380633335533',
    avatar: 'https://i.pravatar.cc/300?img=44',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
    socialNetwork: 'https://www.youtube.com',
    directions: [
      {
        id: 4,
        name: 'therapy',
        label: 'Терапія',
        color: '#ffee58',
        hasDoctors: true,
        hasPosts: true,
      },
    ],
    mainInstitution: {
      id: 4,
      city: {
        id: 119,
        name: 'Дніпро',
      },
      name: 'Медікум',
    },
    lastAddedPost: {
      id: 246,
      title: 'Sit amet consectetur',
    },
  },
  {
    id: 16,
    firstName: 'Олег',
    lastName: 'Петренко',
    email: 'petrenko@mail.com',
    qualification: 'Лікар вищої категорії',
    phone: '+380957773377',
    avatar: 'https://i.pravatar.cc/300?img=16',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    socialNetwork: 'https://www.youtube.com',
    directions: [
      {
        id: 6,
        name: 'cardiology',
        label: 'Кардіологія',
        color: '#00ffff',
        hasDoctors: true,
        hasPosts: true,
      },
    ],
    mainInstitution: {
      id: 5,
      city: {
        id: 55,
        name: 'Бровари',
      },
      name: 'Medical Idea',
    },
    lastAddedPost: {
      id: 266,
      title: 'Офтальмонологія',
    },
  },
];

function setIntersectionObserver({
  root = null,
  rootMargin = '',
  thresholds = [],
  disconnect = () => null,
  observe = () => null,
  takeRecords = () => [],
  unobserve = () => null,
} = {}): void {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | null = root;

    readonly rootMargin: string = rootMargin;

    readonly thresholds: ReadonlyArray<number> = thresholds;

    disconnect: () => void = disconnect;

    observe: (target: Element) => void = observe;

    takeRecords: () => IntersectionObserverEntry[] = takeRecords;

    unobserve: (target: Element) => void = unobserve;
  }

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });

  Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
}

describe('AutoPaginationExpertsList component renders', () => {
  beforeEach(() => {
    setIntersectionObserver();
    render(
      <MemoryRouter>
        <AutoPaginationExpertsList
          experts={EXPERTS_LIST}
          setPage={setPageFunc}
        />
      </MemoryRouter>,
    );
  });

  it("Expert card renders with expert's full name", () => {
    expect(screen.getByText('Марія Марієнко')).toBeInTheDocument();
    expect(screen.getByText('Палана Литвинова')).toBeInTheDocument();
  });

  it("Expert card renders with expert's qualification and main institution", () => {
    const element = document.querySelector('.ExpertDataCard-qualification-17');
    expect(element?.innerHTML).toContain(
      'Лікар вищої категорії, Medical Idea, Бровари',
    );
  });

  it('All expert cards render', () => {
    expect(screen.getAllByRole('link').length).toBe(EXPERTS_LIST.length);
  });
});
