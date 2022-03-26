import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { FieldEnum, IField } from '../../../models/adminLab/types';
import i18, { langTokens } from '../../../locales/localizationInit';

interface IMaterialsTextField {
  field: FieldEnum;
  setChanges: (payload: IField) => void;
  inputValue: string;
}

export const AdminTextField: React.FC<IMaterialsTextField> = ({
  field,
  setChanges,
  inputValue,
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
        type="text"
        value={inputValue}
        placeholder={i18.t(langTokens.admin[field])}
        onChange={(event) => handleChange(event)}
      />
    </FormControl>
  );
};
