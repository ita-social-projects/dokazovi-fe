import React from 'react';
import { Typography, Box } from '@material-ui/core';
import i18, { langTokens } from '../../../locales/localizationInit';
import { AdminTextField } from '../AdminTable/AdminTextField';
import { TextFieldsEnum } from '../../../models/experts/types';
import { AuthorListDropdown } from './AuthorListDropdown';
import { useStyles } from './styles/AuthorsListFilters.styles';
import { setSize, setField } from '../../../models/experts';
import { useActions } from '../../../shared/hooks';

interface IAuthorsListFiltersProps {
  size: number;
  author: string;
}

const optionsToShow = [10, 25, 50, 100];

export const AuthorsListFilters: React.FC<IAuthorsListFiltersProps> = (
  props,
) => {
  const classes = useStyles();
  const { size, author } = props;
  const [boundedSetSize, boundedSetField] = useActions([setSize, setField]);

  const handleNotesToShowChange = (val) => {
    boundedSetSize(val);
  };

  return (
    <Box className={classes.filtersBox}>
      <Typography variant="body1" className={classes.notesToShowPanel}>
        {i18.t(langTokens.admin.showNotesAmount).split(' ')[0]}
        <span>
          <AuthorListDropdown
            options={optionsToShow}
            selected={size}
            setChanges={handleNotesToShowChange}
          />
        </span>
        {i18.t(langTokens.admin.showNotesAmount).split(' ')[1]}
      </Typography>
      <AdminTextField
        field={TextFieldsEnum.AUTHOR}
        setChanges={boundedSetField}
        inputValue={author}
        placeholder={i18.t(langTokens.admin.searchAuthorPlaceholder)}
      />
    </Box>
  );
};
