import React, { useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { debounce } from 'lodash';
import { FieldEnum, IField } from '../../../models/adminLab/types';
import i18, { langTokens } from '../../../locales/localizationInit';

interface IMaterialsTextField {
  field: FieldEnum;
  setChanges: (payload: IField) => void;
  input: string;
}

export const AdminTextField: React.FC<IMaterialsTextField> = ({
  field,
  setChanges,
  input,
}) => {
  // const [text, setText] = useState<string>('');

  // useEffect(() => {
  //   setChanges({ field, text });
  // }, [input]);

  function handleChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) {
    setChanges({
      field: field || '',
      text: event.target.value || '',
    });
    console.log(input);
  }

  return (
    <FormControl>
      <TextField
        type="text"
        value={input}
        placeholder={i18.t(langTokens.admin[field])}
        onChange={(event) => handleChange(event)}
      />
    </FormControl>
  );
};
