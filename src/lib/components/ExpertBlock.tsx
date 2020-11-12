import React from 'react';
import { useStyles } from '../../modules/experts/styles/ExpertBlock.style';
import { IExpert } from '../types';

interface IExpertProps {
  expert: IExpert;
  nameClass: string;
}

export const ExpertBlock: React.FC<IExpertProps> = (props) => {
  const classes = useStyles();

  const { expert, nameClass } = props;
  return (
    <div className={classes[nameClass] as string}>
      <img
        src={expert.photo}
        alt="doctor"
        key={expert.phone}
        className={classes.photo}
      />
    </div>
  );
};
