import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useStyles } from './styles/BasicInput.style';

type ButtonType = 'text' | 'password';

interface IBasicInputProps {
  className?: string;
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputRef?: React.Ref<any>;
  label?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: boolean;
  helperText?: React.ReactNode;
  type?: ButtonType;
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
  const computeType = (): ButtonType => {
    switch (type) {
      case 'password':
        return showPassword ? 'text' : 'password';
      default:
        return 'text';
    }
  };

  return (
    <TextField
      className={clsx(classes.basicInput, className)}
      // eslint-disable-next-line no-nested-ternary
      type={computeType()}
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
