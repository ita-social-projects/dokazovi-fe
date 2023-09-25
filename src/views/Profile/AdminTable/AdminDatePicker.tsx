import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { parsDate } from 'utilities/parsDate';
import { DatePicker } from '@material-ui/pickers';
import { requestDate } from 'utilities/formatDate';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import { langTokens } from '../../../locales/localizationInit';
import { useStyles } from './styles/AdminDatePicker.styles';

type VerticalType = number | 'bottom' | 'top' | 'center';
type HorizontalType = number | 'center' | 'left' | 'right';

const MenuProps = {
  disableScrollLock: true,
  anchorOrigin: {
    vertical: 'bottom' as VerticalType,
    horizontal: 'left' as HorizontalType,
  },
  transformOrigin: {
    vertical: 'top' as VerticalType,
    horizontal: 'left' as HorizontalType,
  },

  getContentAnchorEl: null,
};

interface IMaterialsDate {
  start: string | undefined;
  end: string | undefined;
  setChanges: (...params: any[]) => void;
}

export const AdminDatePicker: React.FC<IMaterialsDate> = ({
  start,
  end,
  setChanges,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const handleDatePicker = (option: string, value) => {
    setChanges({
      option,
      date: requestDate(value),
    });
  };

  return (
    <div>
      <FormControl data-testid="select">
        <Select
          multiple
          value={[]}
          disableUnderline
          displayEmpty
          renderValue={() => (
            <div>
              {t(langTokens.admin.from)} {parsDate(start)}{' '}
              {t(langTokens.admin.to)} {parsDate(end)}
            </div>
          )}
          MenuProps={MenuProps}
        >
          <Box display="flex" className={classes.pickersWrapper}>
            <DatePicker
              autoOk
              orientation="portrait"
              variant="static"
              openTo="date"
              value={start}
              onChange={(value) => {
                handleDatePicker('start', value);
              }}
              format="dd-mm-yyyy"
              maxDate={end}
            />
            <DatePicker
              autoOk
              orientation="portrait"
              variant="static"
              openTo="date"
              value={end}
              onChange={(value) => {
                handleDatePicker('end', value);
              }}
              format="dd-mm-yyyy"
              minDate={start}
            />
          </Box>
        </Select>
      </FormControl>
    </div>
  );
};
