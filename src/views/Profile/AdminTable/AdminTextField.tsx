import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { FieldEnum, IField } from '../../../models/adminLab/types';

interface IMaterialsTextField {
  field: FieldEnum;
  setChanges: (payload: IField) => void;
  inputValue: string;
  placeholder: string;
}

export const AdminTextField: React.FC<IMaterialsTextField> = ({
  field,
  setChanges,
  inputValue,
  placeholder,
}) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setChanges({
      field: field || '',
      text: event.target.value || '',
    });
  };

  return (
    <FormControl>
      <TextField
        data-testid="admin-text-filter"
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={(event) => handleChange(event)}
      />
    </FormControl>
  );
};
