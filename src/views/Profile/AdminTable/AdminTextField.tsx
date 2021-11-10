import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { FieldEnum, IField } from '../../../models/adminLab/types';
import i18, { langTokens } from '../../../locales/localizationInit';

interface IMaterialsTextField {
  value: string;
  field: FieldEnum;
  setChanges: (payload: IField) => void;
}

export const AdminTextField: React.FC<IMaterialsTextField> = ({
  value,
  field,
  setChanges,
}) => {
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setChanges({ field, text });
  };
  return (
    <FormControl>
      <TextField
        placeholder={i18.t(langTokens.admin[field])}
        value={value}
        onChange={handleTextChange}
      />
    </FormControl>
  );
};
