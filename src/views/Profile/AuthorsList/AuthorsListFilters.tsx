import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { Trans } from 'react-i18next';
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

const pageSizes = [10, 25, 50, 100];

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
        <Trans
          i18nKey={langTokens.admin.showNotesAmount}
          components={{
            dropDown: (
              <AuthorListDropdown
                pageSizes={pageSizes}
                selected={size}
                setChanges={handleNotesToShowChange}
              />
            ),
          }}
        />
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
