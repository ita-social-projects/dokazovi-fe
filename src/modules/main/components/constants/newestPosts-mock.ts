import { IPost, PostStatus, ExpertStatus } from '../../../../lib/types';

const NEWEST_POSTS_DATA_MOCK: IPost[] = [
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=1',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      color: '#d1c4e9',
      name: 'Кардіологія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=2',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      color: '#ffee58',
      name: 'Педіатрія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Відео' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=3',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 1,
      color: '#ef5350',
      name: 'COVID-19',
      route: 'covid-19',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=4',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 1,
      color: '#ef5350',
      name: 'COVID-19',
      route: 'covid-19',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Допис' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=5',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=6',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=7',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=8',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=9',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=10',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=11',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=12',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=13',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=14',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=15',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=16',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=17',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=18',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=19',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=20',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=21',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=22',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=23',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=24',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=25',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=26',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=27',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=28',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=29',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=30',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=31',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=32',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=33',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=34',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=35',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=36',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=37',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=38',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=39',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=40',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=41',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=42',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=43',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=44',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=45',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=46',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=47',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=48',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=49',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    author: {
      firstName: 'Ivan',
      lastName: 'Pavlov',

      avatar: 'https://i.pravatar.cc/100?img=50',
      mainInstitution: {
        city: {
          id: 1,
          name: 'Київ',
        },
        id: 1,
        name: 'Hospital #6',
      },
    },
    mainDirection: {
      id: 4,
      color: '#ffee58',
      name: 'Терапія',
    },
    title: 'Mock title',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

    tags: [{ id: 5, tag: 'covid19' }],
    createdAt: '26.11.2020',
    modifiedAt: '11.12.2020',
    postType: { name: 'Стаття' },
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

export default NEWEST_POSTS_DATA_MOCK;
