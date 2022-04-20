import React from 'react';
import { Paper, Table, TableContainer, Box, Button } from '@material-ui/core';
import AuthorsTableHead from './AuthorsTableHead';
import AuthorsTableBody from './AuthorsTableBody';
import { IAdminLabExpert } from 'models/adminLab/types';
import { useStyles } from './styles/AuthorsList.styles';

// /*Temporary Mock for authors info until getting API*/

// const authors: IAdminLabExpert[] = [
//   {
//     id: 10,
//     firstName: 'Марія',
//     lastName: 'Марієнко',
//     region: 'Київська область',
//     dateOfCreation: '12.03.2022',
//     dateOfEdition: '12.03.2022',
//     bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
//     mainInstitution: {
//       id: 5,
//       city: {
//         id: 55,
//         name: 'Бровари',
//       },
//       name: 'Medical Idea',
//     },
//   },
//   {
//     id: 6,
//     firstName: 'Палана',
//     lastName: 'Литвинова',
//     region: 'Дніпропетровська область',
//     dateOfCreation: '12.03.2022',
//     dateOfEdition: '12.03.2022',
//     bio:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ',
//     mainInstitution: {
//       id: 4,
//       city: {
//         id: 119,
//         name: 'Дніпро',
//       },
//       name: 'Медікум',
//     },
//   },
//   {
//     id: 6,
//     firstName: 'Таржеман',
//     lastName: 'Соколов',
//     region: 'Дніпропетровська область',
//     dateOfCreation: '12.03.2022',
//     dateOfEdition: '12.03.2022',
//     bio:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',

//     mainInstitution: {
//       id: 4,
//       city: {
//         id: 119,
//         name: 'Дніпро',
//       },
//       name: 'Медікум',
//     },
//     lastAddedPost: {
//       id: 246,
//       title: 'Sit amet consectetur',
//     },
//   },
//   {
//     id: 16,
//     firstName: 'Олег',
//     lastName: 'Петренко',
//     region: 'Київська область',
//     dateOfCreation: '12.03.2022',
//     dateOfEdition: '12.03.2022',
//     bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
//     mainInstitution: {
//       id: 5,
//       city: {
//         id: 55,
//         name: 'Бровари',
//       },
//       name: 'Medical Idea',
//     },
//   },
// ];

// /*End of Mock section */

export const AuthorsList: React.FC = () => {
  const classes = useStyles();
  /*Temporary Mock for authors info until getting API*/

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

  /*End of Mock section */

  return (
    <>
      <Box display="flex" flexDirection="row" justifyContent="flex-end">
        <Button
          variant="contained"
          onClick={() => {
            alert('clicked');
          }}
          className={classes.mainButton}
        >
          Створити нового автора
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <AuthorsTableHead />
          <AuthorsTableBody authors={authors} />
        </Table>
      </TableContainer>
    </>
  );
};
