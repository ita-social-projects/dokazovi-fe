import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useStyles } from './styles/BasicInput.style';

interface IBasicInputProps {
  className?: string;
  name?: string;
  inputRef?: React.Ref<any>;
  label?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: boolean;
  helperText?: React.ReactNode;
  type?: 'text' | 'password';
}

export const BasicInput: React.FC<IBasicInputProps> = ({
  className,
  inputRef,
  name,
  label,
  onChange,
  error,
  helperText,
  type = 'text',
}) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextField
      className={clsx(classes.basicInput, className)}
      type={type === 'text' ? type : showPassword ? 'text' : 'password'}
      variant="outlined"
      margin="normal"
      fullWidth
      name={name}
      inputRef={inputRef}
      label={label}
      onChange={onChange}
      error={error}
      helperText={helperText}
      InputProps={{
        endAdornment: type === 'password' && (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              className={classes.visibilityIconButton}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <VisibilityOff className={classes.visibilityIcon} />
              ) : (
                <Visibility className={classes.visibilityIcon} />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
