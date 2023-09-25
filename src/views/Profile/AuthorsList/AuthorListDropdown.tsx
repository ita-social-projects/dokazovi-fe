import React from 'react';
import { FormControl, Select, InputBase, MenuItem } from '@material-ui/core';
import { useStyles } from './styles/AuthorListDropdown.styles';

export type PageSizeType = Array<number | 'All'>;

interface IAuthorListDropdownProps {
  pageSizes: PageSizeType;
  selected: number | string | undefined;
  setChanges: (payload: number | unknown) => void;
}

export const AuthorListDropdown: React.FC<IAuthorListDropdownProps> = ({
  pageSizes,
  selected,
  setChanges,
}) => {
  const classes = useStyles();
  const handleChange = (
    event: React.ChangeEvent<{ value: number | unknown }>,
  ) => {
    setChanges(event.target.value);
  };

  return (
    <>
      <FormControl variant="standard">
        <Select
          value={selected}
          onChange={handleChange}
          input={<InputBase />}
          className={classes.dropdown}
        >
          {pageSizes.map((val) => (
            <MenuItem value={val} key={val}>
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
