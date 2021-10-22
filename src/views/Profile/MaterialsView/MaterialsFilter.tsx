/* eslint-disable */
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';

import { QueryTypeEnum } from 'old/lib/types';

import { defaultPlural, langTokens } from '../../../locales/localizationInit';
import { useStyles } from './styles/MaterialsFilter.styles';

type VerticalType = number | 'bottom' | 'top' | 'center';
type HorizontalType = number | 'center' | 'left' | 'right';

type OptionType = { id: number; name: string };
interface IFilter {
  allOptions: OptionType[];
  selected: number[] | undefined;
  filter: QueryTypeEnum;
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

const SET_ALL_OPTIONS = 0;

export const MaterialsFilter: React.FC<IFilter> = ({
  allOptions,
  selected,
  filter,
  setChanges,
}) => {
  const ALL_OPTIONS_IDS = allOptions.map((e) => e.id);

  const classes = useStyles();

  const handleChange = ({ target }) => {
    if (target?.value) {
      const value = target?.value as number[];
      const options =
        value.indexOf(SET_ALL_OPTIONS) > -1
          ? selected?.length === allOptions.length
            ? []
            : ALL_OPTIONS_IDS
          : value;
      setChanges({ filter, options });
    }
  };

  const FilterLabel = () => {
    const length = selected?.length;
    return (
      <div>
        {filter}
        {!!selected?.length && (
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
          <MenuItem key={0} value={0}>
            <Checkbox checked={selected?.length === allOptions.length} />
            <ListItemText primary="Всі Категорії" />
          </MenuItem>
          {allOptions.map(({ name, id }) => (
            <MenuItem key={id} value={id}>
              <Checkbox checked={!!selected?.find((ID) => id === ID)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
