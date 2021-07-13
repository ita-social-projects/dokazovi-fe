import React from 'react';
import { useStyles } from './styles/InfoView.styles';

const SecurityView: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.section}>Security</div>
    </>
  );
};

export default SecurityView;
