import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Input from '@material-ui/core/Input';
import { ExpertResponseType } from '../../../lib/utilities/API/types';

interface IPostAuthorSelectionProps {
  handleOnChange: (value: string) => void;
  onAuthorTableClick: (value: number, item: ExpertResponseType) => void;
  authors: ExpertResponseType[];
  searchValue: string;
}

export const PostAuthorSelection: React.FC<IPostAuthorSelectionProps> = ({
  handleOnChange,
  onAuthorTableClick,
  searchValue,
  authors,
}) => {
  const table = authors.map((item, idx) => {
    const { id, firstName, lastName } = item;
    return (
      <TableRow key={id} onClick={() => onAuthorTableClick(id, item)} hover>
        <TableCell>{idx + 1}</TableCell>
        <TableCell>{firstName}</TableCell>
        <TableCell>{lastName}</TableCell>
      </TableRow>
    );
  });
  return (
    <>
      <Input
        placeholder="Choose some author"
        onChange={(e) => {
          handleOnChange(e.target.value);
        }}
        type="inputTypeSearch"
        value={searchValue}
      />
      {authors.length !== 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Second Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{table}</TableBody>
        </Table>
      )}
    </>
  );
};
