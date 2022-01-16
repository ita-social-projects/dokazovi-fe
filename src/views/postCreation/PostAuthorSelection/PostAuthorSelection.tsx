import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import { useTranslation } from 'react-i18next';
import { ExpertResponseType } from '../../../old/lib/utilities/API/types';
import { langTokens } from '../../../locales/localizationInit';
import { useStyle } from '../RequiredFieldsStyle';

interface IPostAuthorSelectionProps {
  handleOnChange: (value: string) => void;
  onAuthorTableClick: (value: number, item: ExpertResponseType) => void;
  authors?: ExpertResponseType[];
  searchValue?: string;
  authorsLength?: number | null;
  isDisplayTable?: boolean;
}

export const PostAuthorSelection: React.FC<IPostAuthorSelectionProps> = ({
  handleOnChange,
  onAuthorTableClick,
  searchValue,
  authors,
  authorsLength,
  isDisplayTable,
}) => {
  const { t } = useTranslation();
  const classes = useStyle();

  const table = authors?.map((item, idx) => {
    const { id, firstName, lastName } = item;
    return (
      <TableRow
        data-testid="row"
        key={id}
        onClick={() => onAuthorTableClick(id, item)}
        hover
      >
        <TableCell>{idx + 1}</TableCell>
        <TableCell>{firstName}</TableCell>
        <TableCell data-testid="item">{lastName}</TableCell>
      </TableRow>
    );
  });

  return (
    <>
      <FormControl>
        <InputLabel
          className={classes.requiredAuthorField}
          htmlFor="author-input"
        >
          Find post author
        </InputLabel>
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

      {authors?.length !== 0
        ? isDisplayTable && (
            <Table data-testid="authors-table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Second Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{table}</TableBody>
            </Table>
          )
        : authorsLength === 0 &&
          searchValue?.length !== 0 && (
            <div style={{ color: 'red' }}>
              {t(langTokens.common.noFoundAuthors)}
            </div>
          )}

      <div style={{ marginBottom: '24px' }} />
    </>
  );
};
