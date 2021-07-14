import React from 'react';
import { useStyles } from './styles/InfoView.styles';

const MailView: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.section}>Mail</div>
    </>
  );
};

export default MailView;
