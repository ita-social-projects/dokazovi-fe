/* eslint-disable */
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

import { useStyles } from './styles/AdminFilter.styles';
import { useTranslation } from 'react-i18next';
import { langTokens } from '../../../locales/localizationInit';

type VerticalType = number | 'bottom' | 'top' | 'center';
type HorizontalType = number | 'center' | 'left' | 'right';

type OptionType = {
  id: number;
  name: string;
  label?: string;
};
interface IMaterialsFilter {
  allOptions: OptionType[];
  selected: number[] | undefined;
  filter: string;
  setChanges: (payload: any) => void;
}

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

const SET_ALL_OPTIONS = -1;

export const AdminFilter: React.FC<IMaterialsFilter> = ({
  allOptions,
  selected,
  filter,
  setChanges,
}) => {
  const ALL_OPTIONS_IDS = allOptions.map((e) => e.id);

  const classes = useStyles();
  const { t } = useTranslation();

  const handleChange = ({ target }) => {
    if (target?.value) {
      const value = target?.value as number[];
      if (value.indexOf(SET_ALL_OPTIONS) > -1) {
        const options =
          selected?.length === allOptions.length ? [] : ALL_OPTIONS_IDS;
        setChanges({ filter, options });
      } else {
        setChanges({ filter, options: value });
      }
    }
  };

  const FilterLabel = () => {
    const length = selected?.length;
    return (
      <div>
        {t(langTokens.admin[filter])}
        {!!length && (
          <label className={classes.filterCounter}>{selected?.length}</label>
        )}
      </div>
    );
  };

  return (
    <div>
      <FormControl>
        <Select
          className={classes.filterHeader}
          multiple
          disableUnderline
          displayEmpty
          value={selected}
          onChange={handleChange}
          renderValue={() => <FilterLabel />}
          MenuProps={MenuProps}
        >
          <MenuItem key={SET_ALL_OPTIONS} value={SET_ALL_OPTIONS}>
            <Checkbox checked={selected?.length === allOptions.length} />
            <ListItemText primary={t(langTokens.common.all)} />
          </MenuItem>
          {allOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              <Checkbox checked={!!selected?.includes(option.id)} />
              <ListItemText primary={option?.label ?? option.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
