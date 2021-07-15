import React from 'react';
import { useStyles } from './styles/MaterialsView.styles';

export const MaterialsView: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.section}>Materials</div>
    </>
  );
};
