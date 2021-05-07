import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import { ExpertResponseType } from '../../../../lib/utilities/API/types';

interface IPostAuthorSelectionProps {
  handleOnChange: (value: string) => void;
  onAuthorTableClick: (value: number, item: ExpertResponseType) => void;
  authors?: ExpertResponseType[];
  searchValue?: string;
}

export const PostAuthorSelection: React.FC<IPostAuthorSelectionProps> = ({
  handleOnChange,
  onAuthorTableClick,
  searchValue,
  authors,
}) => {
  const table = authors?.map((item, idx) => {
    const { id, firstName, lastName } = item;
    return (
      <TableRow key={id} onClick={() => onAuthorTableClick(id, item)} hover>
        <TableCell>{idx + 1}</TableCell>
        <TableCell>{firstName}</TableCell>
        <TableCell data-testid="item">{lastName}</TableCell>
      </TableRow>
    );
  });
  return (
    <>
      <FormControl>
        <InputLabel htmlFor="author-input">Find post author</InputLabel>
        <Input
          inputComponent="input"
          placeholder="Choose some author"
          onChange={(e) => {
            handleOnChange(e.target.value);
          }}
          type="inputTypeSearch"
          value={searchValue}
          id="author-input"
          aria-label="author-input"
          aria-describedby="component-helper-text"
        />
      </FormControl>

      {authors?.length !== 0 && (
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
