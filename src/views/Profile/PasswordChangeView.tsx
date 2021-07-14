import React from 'react';
import { useStyles } from './styles/InfoView.styles';

const PasswordChangeView: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.section}>Password Change</div>
    </>
  );
};

export default PasswordChangeView;
