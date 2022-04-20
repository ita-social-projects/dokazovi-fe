import React from 'react';
import {
  Chip,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { IAdminExpertsList, IAdminLabExpert } from 'models/adminLab/types';

const authors: IAdminLabExpert[] = [
  {
    id: 10,
    firstName: 'Марія',
    lastName: 'Марієнко',
    region: 'Київська область',
    dateOfCreation: '12.03.2022',
    dateOfEdition: '12.03.2022',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    mainInstitution: {
      id: 5,
      city: {
        id: 55,
        name: 'Бровари',
      },
      name: 'Medical Idea',
    },
  },
  {
    id: 6,
    firstName: 'Палана',
    lastName: 'Литвинова',
    region: 'Дніпропетровська область',
    dateOfCreation: '12.03.2022',
    dateOfEdition: '12.03.2022',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ',
    mainInstitution: {
      id: 4,
      city: {
        id: 119,
        name: 'Дніпро',
      },
      name: 'Медікум',
    },
  },
  {
    id: 6,
    firstName: 'Таржеман',
    lastName: 'Соколов',
    region: 'Дніпропетровська область',
    dateOfCreation: '12.03.2022',
    dateOfEdition: '12.03.2022',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',

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
    region: 'Київська область',
    dateOfCreation: '12.03.2022',
    dateOfEdition: '12.03.2022',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    mainInstitution: {
      id: 5,
      city: {
        id: 55,
        name: 'Бровари',
      },
      name: 'Medical Idea',
    },
  },
];

const AutorsListTableBody: React.FC = () => {
  return <TableBody>Table</TableBody>;
};

export default AutorsListTableBody;
