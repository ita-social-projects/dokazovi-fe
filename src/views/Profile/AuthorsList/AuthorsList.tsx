import React, { useEffect } from 'react';
import {
  Paper,
  Table,
  TableContainer,
  Box,
  Button,
  Typography,
} from '@material-ui/core';
import { IAdminLabExpert } from 'models/adminLab/types';
import { getDoctorsList } from 'old/lib/utilities/API/api';
import AuthorsTableHead from './AuthorsTableHead';
import AuthorsTableBody from './AuthorsTableBody';
import { AuthorsTablePagination } from './AuthorsTablePagination';
import { AuthorsListFilters } from './AuthorsListFilters';
import { useStyles } from './styles/AuthorsList.styles';
import i18n, { langTokens } from '../../../locales/localizationInit';

export const AuthorsList: React.FC = () => {
  const classes = useStyles();
  /* Temporary Mock for authors info until getting API */

  const notesCount = {
    from: '1',
    to: '4',
    total: '4',
  };

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

  /* End of Mock section */

  useEffect(() => {
    const fetchDoctorsList = async () => {
      const response = await getDoctorsList();
      console.log(response);
    };
    fetchDoctorsList().catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Box className={classes.listFunctionalityPanel}>
        <AuthorsListFilters />
        <Button
          variant="contained"
          onClick={() => {
            alert('clicked');
          }}
          className={classes.mainButton}
        >
          {i18n.t(langTokens.admin.createNewAuthor)}
        </Button>
      </Box>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <AuthorsTableHead />
          <AuthorsTableBody authors={authors} />
        </Table>
      </TableContainer>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Typography>
          {/* need to add langToken */}
          {`Відображено від ${notesCount.from} до ${notesCount.to} записів з
          ${notesCount.total} доступних`}
        </Typography>
        <AuthorsTablePagination />
      </Box>
    </>
  );
};
