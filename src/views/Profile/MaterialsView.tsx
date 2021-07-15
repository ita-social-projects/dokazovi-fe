import React from 'react';
import { useStyles } from './styles/MaterialsView.styles';

const MaterialsView: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.section}>Materials</div>
    </>
  );
};

export default MaterialsView;
