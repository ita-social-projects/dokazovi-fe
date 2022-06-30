import React, { useState } from 'react';
import { Typography, Box } from '@material-ui/core';
import i18, { langTokens } from '../../../locales/localizationInit';
import { AdminTextField } from '../AdminTable/AdminTextField';
import { FieldEnum } from '../../../models/adminLab/types';
import { AuthorListDropdown } from './AuthorListDropdown';
import { useStyles } from './styles/AuthorsListFilters.styles';

const optionsToShow = ['10', '25', '50', '100'];

export const AuthorsListFilters: React.FC = () => {
  const [searchValue, setSearchValue] = useState({ field: '', text: '' });
  const [notesToShowAmount, setNotesToShowAmount] = useState(optionsToShow[0]);

  const classes = useStyles();

  const handleAuthorSearch = (obj) => {
    setSearchValue(obj);
    console.log(`author search with`, searchValue);
  };

  const handleNotesToShowChange = (val) => {
    setNotesToShowAmount(val);
    console.log(val, `notes are shown`);
  };

  return (
    <Box className={classes.filtersBox}>
      <Typography variant="body1" className={classes.notesToShowPanel}>
        {i18.t(langTokens.admin.showNotesAmount).split(' ')[0]}
        <span>
          <AuthorListDropdown
            options={optionsToShow}
            selected={notesToShowAmount}
            setChanges={handleNotesToShowChange}
          />
        </span>
        {i18.t(langTokens.admin.showNotesAmount).split(' ')[1]}
      </Typography>
      <AdminTextField
        field={FieldEnum.AUTHOR}
        setChanges={handleAuthorSearch}
        inputValue={searchValue.text}
        placeholder={i18.t(langTokens.admin.searchAuthorPlaceholder)}
      />
    </Box>
  );
};
