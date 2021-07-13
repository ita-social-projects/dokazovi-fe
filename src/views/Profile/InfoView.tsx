import React from 'react';
import { useStyles } from './styles/InfoView.styles';

const InfotView: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.section}>Info</div>
    </>
  );
};

export default InfotView;
