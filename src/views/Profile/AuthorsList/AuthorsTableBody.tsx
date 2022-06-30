import React from 'react';
import {
  Chip,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Box,
} from '@material-ui/core';
import { DeleteOutlined, EditOutlined } from '@material-ui/icons';
import { IAdminExpertsList, IAdminLabExpert } from 'models/adminLab/types';
import { useStyles } from './styles/AuthorsTable.styles';

interface IAuthorsTableBodyProps {
  authors: Array<IAdminLabExpert>;
}

const AuthorsTableBody: React.FC<IAuthorsTableBodyProps> = ({ authors }) => {
  const classes = useStyles();
  const rows = authors.map((author) => {
    const {
      id,
      firstName,
      lastName,
      region,
      dateOfCreation,
      dateOfEdition,
    } = author;

    const fullName = `${firstName} ${lastName}`;

    const handleChangeClick = (arg: number) => {
      alert(`author${arg} changing toggled`);
    };

    const handleDeleteClick = (arg: number) => {
      alert(`author${arg} deletion toggled`);
    };

    return (
      <TableRow key={id}>
        <TableCell>{id}</TableCell>
        <TableCell>
          <Typography variant="h6" component="p">
            {fullName}
          </Typography>
        </TableCell>
        <TableCell>{region}</TableCell>
        <TableCell>City</TableCell>
        <TableCell>{dateOfCreation}</TableCell>

        <TableCell>{dateOfEdition}</TableCell>
        <TableCell>
          <IconButton
            aria-label="edit profile"
            onClick={() => handleChangeClick(id)}
            className={classes.editButton}
          >
            <EditOutlined />
          </IconButton>
          <IconButton
            aria-label="delete profile"
            onClick={() => handleDeleteClick(id)}
            className={classes.deleteButton}
          >
            <DeleteOutlined />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  });

  return <TableBody>{rows}</TableBody>;
};

export default AuthorsTableBody;
