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

interface IAuthorsTableBodyProps {
  authors: Array<IAdminLabExpert>;
}

const AuthorsTableBody: React.FC<IAuthorsTableBodyProps> = ({ authors }) => {
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
        <TableCell>Action</TableCell>
      </TableRow>
    );
  });

  return <TableBody>{rows}</TableBody>;
};

export default AuthorsTableBody;
