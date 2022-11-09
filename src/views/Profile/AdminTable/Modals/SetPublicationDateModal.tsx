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
const dateRangeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
  </svg>
);

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
      <Box className={classes.dateRangeIcon}>{dateRangeIcon}</Box>
      <DateTimePicker
        label={t(langTokens.admin.choosePublicationDate)}
        value={new Date(newPostPublicationDate)}
        variant="inline"
        format="dd.MM.yyyy HH:mm"
        ampm={false}
        InputProps={{ disableUnderline: true }}
        // eslint-disable-next-line
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
