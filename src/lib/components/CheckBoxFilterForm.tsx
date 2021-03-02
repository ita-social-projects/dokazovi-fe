import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => createStyles({}), {
  name: 'CheckBoxFilterForm',
});

export interface IChecBboxFilterFormProps {}

const CheckBoxFilterForm: React.FC<IChecBboxFilterFormProps> = (props) => {
  const classes = useStyles();
  return <>test</>;
};

export default CheckBoxFilterForm;
