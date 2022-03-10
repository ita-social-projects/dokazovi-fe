import React, { useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { FieldEnum, IField } from '../../../models/adminLab/types';
import { TextFieldWithDebounce } from './TextFieldWithDebounce';

interface IMaterialsTextField {
  field: FieldEnum;
  placeholder: string;
  setChanges: (payload: IField) => void;
}

export const AdminTextField: React.FC<IMaterialsTextField> = ({
  field,
  placeholder,
  setChanges,
}) => {
  const [text, setText] = useState<string>('');

  useEffect(() => {
    setChanges({ field, text });
  }, [text]);

  return (
    <FormControl>
      <TextFieldWithDebounce placeholder={placeholder} setInput={setText} />
    </FormControl>
  );
};
