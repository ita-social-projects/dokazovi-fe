/* eslint-disable */
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch } from 'react-redux';

import { QueryTypeEnum } from 'old/lib/types';
import { setFilter } from '../../../models/adminlab';

type VerticalType = number | 'bottom' | 'top' | 'center';
type HorizontalType = number | 'center' | 'left' | 'right';

type OptionType = { id: number; name: string };
interface IFilter {
  allOptions: OptionType[];
  selected: number[] | undefined;
  filter: QueryTypeEnum;
}

const MenuProps = {
  transformOrigin: {
    vertical: 'bottom' as VerticalType,
    horizontal: 'left' as HorizontalType,
  },
  getContentAnchorEl: null,
};

const SET_ALL_OPTIONS = 0;

export const MaterialsFilter: React.FC<IFilter> = ({
  allOptions,
  selected,
  filter,
}) => {
  const dispatch = useDispatch();
  const handleChange = ({ target }) => {
    if (target?.value) {
      const value = target?.value as number[];
      const options =
        value.indexOf(SET_ALL_OPTIONS) > -1
          ? allOptions.map((e) => e.id)
          : value;
      dispatch(setFilter({ filter, options }));
    }
  };

  return (
    <div>
      <FormControl>
        <Select
          multiple
          value={selected}
          onChange={handleChange}
          renderValue={() => filter}
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
