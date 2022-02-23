import React, { useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { DatePicker } from '@material-ui/pickers';
import { langTokens } from 'locales/localizationInit';
import { useTranslation } from 'react-i18next';
import { useStyles } from './ChangePublicationDateModal.styles';
import {
  selectAdminLab,
  selectModifications,
  setNewPostDateInput,
} from '../../../../models/adminLab';
import { useActions } from '../../../../shared/hooks';

interface IChangeViewsCountModal {
  id: number;
}

const ChangePublicationDateModal: React.FC<IChangeViewsCountModal> = ({
  id,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { posts } = useSelector(selectAdminLab);
  const { newPostPublicationDate } = useSelector(selectModifications);
  const [boundSetPostDateInput] = useActions([setNewPostDateInput]);

  useEffect(() => {
    boundSetPostDateInput({ newPublicationDate: posts[id].publishedAt });
  }, []);

  const handleInputChange = (event) => {
    const date = new Date(event).toLocaleDateString();
    boundSetPostDateInput({ newPublicationDate: date });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      className={classes.wrapper}
    >
      <Typography>{t(langTokens.admin.currentPublicationDate)}</Typography>
      <Typography className={classes.currentDate}>
        {posts[id].createdAt}
      </Typography>
      <Typography>{t(langTokens.admin.newPublicationDate)}</Typography>
      <DatePicker
        value={newPostPublicationDate.split('.').reverse().join('-')}
        variant="inline"
        format="dd.MM.yyyy"
        InputProps={{ disableUnderline: true }}
        onChange={handleInputChange}
      />
    </Box>
  );
};

export default ChangePublicationDateModal;
