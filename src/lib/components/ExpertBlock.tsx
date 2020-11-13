import React from 'react';
import { IExpert } from '../types';
import { useStyles } from '../styles/ExpertBlock.styles';

interface IExpertProps {
  expert: IExpert;
}

export const ExpertBlock: React.FC<IExpertProps> = (props) => {
  const classes = useStyles();

  const { expert } = props;
  return (
    <>
      <img
        src={expert.photo}
        alt="doctor"
        key={expert.phone}
        className={classes.photo}
      />
    </>
  );
};
