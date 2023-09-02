import React, { useReducer } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { parsDate } from 'utilities/parsDate'; // Import as needed
import { DatePicker } from '@material-ui/pickers'; // Import as needed
import { requestDate } from 'utilities/formatDate'; // Import as needed
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import { langTokens } from '../../../locales/localizationInit';
import {
  useStyles,
  useStylesForDatePicker,
} from './styles/AdminDatePicker.styles'; // Import as needed

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

const datePickerReducer = (
  state: { start: string; end: string },
  action: { type: string; position: string },
) => {
  switch (action.type) {
    case 'SET_BG_COLOR':
      return {
        ...state,
        [action.position]: 'grey',
      };
    default:
      return state;
  }
};

export const AdminDatePicker: React.FC<IMaterialsDate> = ({
  start,
  end,
  setChanges,
}) => {
  const [datePickerState, dispatch] = useReducer(datePickerReducer, {
    start: 'transparent',
    end: 'transparent',
  });

  const classes = useStyles();
  const datepickerClassesStart = useStylesForDatePicker({
    bgColorForDatePicker: datePickerState.start,
  });
  const datepickerClassesEnd = useStylesForDatePicker({
    bgColorForDatePicker: datePickerState.end,
  });

  const { t } = useTranslation();
  const today = new Date();

  const handleDatePicker = (option: string, value: Date | null) => {
    if (value) {
      dispatch({ type: 'SET_BG_COLOR', position: option });
      setChanges({
        option,
        date: requestDate(value),
      });
    }
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
            <Box className={datepickerClassesStart.datePicker}>
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
                maxDate={today}
              />
            </Box>
            <Box className={datepickerClassesEnd.datePicker}>
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
                maxDate={today}
              />
            </Box>
          </Box>
        </Select>
      </FormControl>
    </div>
  );
};
