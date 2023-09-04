import React, { useReducer } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { parsDate } from 'utilities/parsDate';
import { DatePicker } from '@material-ui/pickers';
import { requestDate } from 'utilities/formatDate';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import { langTokens } from '../../../locales/localizationInit';
import {
  useStyles,
  useStylesForDatePicker,
} from './styles/AdminDatePicker.styles';

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

type ISelectedDayType = {
  bgColor: 'transparent' | 'grey';
  value: string | '';
};

const datePickerReducer = (
  state: {
    firstSelectedDay: ISelectedDayType;
    secondSelectedDay: ISelectedDayType;
  },
  action: { type: string; payload: ISelectedDayType },
): {
  firstSelectedDay: ISelectedDayType;
  secondSelectedDay: ISelectedDayType;
} => {
  switch (action.type) {
    case 'SET_START_DAY':
      return {
        ...state,
        firstSelectedDay: {
          bgColor: action.payload.bgColor,
          value: action.payload.value,
        },
      };
    case 'SET_END_DAY':
      return {
        ...state,
        secondSelectedDay: {
          bgColor: action.payload.bgColor,
          value: action.payload.value,
        },
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
    firstSelectedDay: { bgColor: 'transparent', value: '' },
    secondSelectedDay: { bgColor: 'transparent', value: '' },
  });

  const classes = useStyles();
  const datepickerClassesStart = useStylesForDatePicker({
    bgColorForDatePicker: datePickerState.firstSelectedDay.bgColor,
  });
  const datepickerClassesEnd = useStylesForDatePicker({
    bgColorForDatePicker: datePickerState.secondSelectedDay.bgColor,
  });

  const { t } = useTranslation();
  const today = new Date();

  const handleDatePicker = (option: string, value: Date | null) => {
    if (value) {
      const changedValue = value.setHours(23, 59, 59, 0).toString();
      const condition =
        (option === 'start' &&
          changedValue !== datePickerState.firstSelectedDay.value) ||
        (option === 'end' &&
          changedValue !== datePickerState.secondSelectedDay.value);

      if (condition) {
        dispatch({
          type: `SET_${option.toUpperCase()}_DAY`,
          payload: { bgColor: 'grey', value: changedValue },
        });
        setChanges({
          option,
          date: requestDate(value),
        });
      } else {
        dispatch({
          type: `SET_${option.toUpperCase()}_DAY`,
          payload: { bgColor: 'transparent', value: '' },
        });
        setChanges({
          option,
          date: undefined,
        });
      }
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
          renderValue={() =>
            !datePickerState.firstSelectedDay.value &&
            !datePickerState.secondSelectedDay.value ? (
              <DateRangeOutlinedIcon />
            ) : (
              <div>
                {t(langTokens.admin.filterByDatePeriod, {
                  rangeStart: parsDate(start),
                  rangeEnd: parsDate(end),
                })}
              </div>
            )
          }
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
