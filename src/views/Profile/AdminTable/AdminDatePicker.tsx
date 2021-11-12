import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { DatePicker } from '@material-ui/pickers';

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
  setChanges: (payload: any) => void;
}

export const AdminDatePicker: React.FC<IMaterialsDate> = ({
  start,
  end,
  setChanges,
}) => {
  const parsDate = (date: string | undefined) => {
    return date && new Date(date).toISOString().slice(0, 10);
  };

  return (
    <div>
      <FormControl>
        <Select
          multiple
          value={[]}
          disableUnderline
          displayEmpty
          renderValue={() => (
            <div>
              from {parsDate(start)} to {parsDate(end)}
            </div>
          )}
          MenuProps={MenuProps}
        >
          <MenuItem>
            <DatePicker
              autoOk
              orientation="landscape"
              variant="static"
              openTo="date"
              value={start}
              onChange={(value) =>
                setChanges({
                  option: 'start',
                  date: value && value.toString(),
                })
              }
              format="dd-mm-yyyy"
              maxDate={end}
            />
            <DatePicker
              autoOk
              orientation="landscape"
              variant="static"
              openTo="date"
              value={end}
              onChange={(value) =>
                setChanges({
                  option: 'end',
                  date: value && value.toString(),
                })
              }
              format="dd-mm-yyyy"
              minDate={start}
            />
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
