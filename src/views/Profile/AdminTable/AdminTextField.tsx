import React, { useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { FieldEnum, IField } from '../../../models/adminLab/types';
import i18, { langTokens } from '../../../locales/localizationInit';
import { TextFieldWithDebounce } from './TextFieldWithDebounce';

interface IMaterialsTextField {
  field: FieldEnum;
  setChanges: (payload: IField) => void;
}

export const AdminTextField: React.FC<IMaterialsTextField> = ({
  field,
  setChanges,
}) => {
  const [text, setText] = useState<string>('');

  useEffect(() => {
    if (text.length < 3) return;
    setChanges({ field, text });
  }, [text]);

  return (
    <FormControl>
      <TextFieldWithDebounce
        placeholder={i18.t(langTokens.admin[field])}
        setInput={setText}
      />
    </FormControl>
  );
};
