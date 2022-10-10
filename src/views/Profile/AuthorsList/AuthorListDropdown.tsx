import React, { useState } from 'react';
import { FormControl, Select, InputBase, MenuItem } from '@material-ui/core';
import { useStyles } from './styles/AuthorListDropdown.styles';

interface IAuthorListDropdownProps {
  options: number[];
  selected: number;
  setChanges: (payload: any) => void;
}

export const AuthorListDropdown: React.FC<IAuthorListDropdownProps> = ({
  options,
  selected,
  setChanges,
}) => {
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setChanges(event.target.value as number);
  };

  return (
    <>
      <FormControl variant="standard">
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={selected}
          onChange={handleChange}
          input={<InputBase />}
          className={classes.dropdown}
        >
          {options.map((val) => (
            <MenuItem value={val} key={val}>
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
