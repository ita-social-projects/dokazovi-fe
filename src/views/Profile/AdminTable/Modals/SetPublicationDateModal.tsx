import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { DateTimePicker } from '@material-ui/pickers';
import { langTokens } from 'locales/localizationInit';
import { useTranslation } from 'react-i18next';
import { useStyles } from './SetPublicationDateModal.styles';
import {
  selectAdminLab,
  selectModifications,
  setNewPostDateInput,
} from '../../../../models/adminLab';
import { useActions } from '../../../../shared/hooks';

interface IChangeViewsCountModal {
  id: number;
}

const SetPublicationDateModal: React.FC<IChangeViewsCountModal> = ({ id }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { posts } = useSelector(selectAdminLab);
  const { newPostPublicationDate } = useSelector(selectModifications);
  const [boundSetPostDateInput] = useActions([setNewPostDateInput]);

  useEffect(() => {
    boundSetPostDateInput({ newPublicationDate: posts[id].publishedAt });
  }, []);

  const handleInputChange = (event) => {
    const date = new Date(event).getTime();
    boundSetPostDateInput({ newPublicationDate: date });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      className={classes.wrapper}
    >
      <DateTimePicker
        label={t(langTokens.admin.choosePublicationDate)}
        value={new Date(newPostPublicationDate)}
        variant="inline"
        format="dd.MM.yyyy HH:mm"
        ampm={false}
        InputProps={{ disableUnderline: true }}
        inputProps={{
          placeholder: 'дд.мм.рррр гг:хх',
          type: 'datetime',
          variant: 'outlined',
          className: classes.currentDate,
        }}
        onChange={handleInputChange}
        className={classes.datePicker}
      />
    </Box>
  );
};

export default SetPublicationDateModal;
