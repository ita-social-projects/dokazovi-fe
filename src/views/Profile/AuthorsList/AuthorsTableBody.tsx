import React from 'react';
import {
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import { EditOutlined } from '@material-ui/icons';
import { IAdminLabExpert } from 'models/adminLab/types';
import { format, parseISO } from 'date-fns';
import { useStyles } from './styles/AuthorsTable.styles';
import AuthorsDeletingDialog from './AuthorsDeletingDialog';

interface IAuthorsTableBodyProps {
  authors: Array<IAdminLabExpert>;
}

const AuthorsTableBody: React.FC<IAuthorsTableBodyProps> = (props) => {
  const { authors } = props;
  const classes = useStyles();
  const rows = authors.map((author) => {
    const {
      id,
      firstName,
      lastName,
      region,
      createdAt,
      editedAt,
      mainInstitution,
      isAllowedToDelete,
    } = author;

    const parsedCreatedAt = format(parseISO(createdAt as string), 'd.MM.yyyy');
    const parsedEditedAt = editedAt
      ? format(parseISO(editedAt), 'd.MM.yyyy')
      : parsedCreatedAt;

    const fullName = `${firstName} ${lastName}`;

    const handleChangeClick = (arg: number) => {
      alert(`author${arg} changing toggled`);
    };

    return (
      <TableRow key={id}>
        <TableCell>{id}</TableCell>
        <TableCell>
          <Typography variant="h6" component="p">
            {fullName}
          </Typography>
        </TableCell>
        <TableCell>{region?.name}</TableCell>
        <TableCell>{mainInstitution?.city.name}</TableCell>
        <TableCell>{parsedCreatedAt}</TableCell>

        <TableCell>{parsedEditedAt}</TableCell>
        <TableCell>
          <div className={classes.modifSection}>
            <IconButton
              aria-label="edit profile"
              onClick={() => handleChangeClick(id)}
              className={classes.editButton}
            >
              <EditOutlined />
            </IconButton>
            <AuthorsDeletingDialog
              id={id}
              fullName={fullName}
              isAllowedToDelete={isAllowedToDelete}
            />
          </div>
        </TableCell>
      </TableRow>
    );
  });

  return <TableBody>{rows}</TableBody>;
};

export default AuthorsTableBody;
