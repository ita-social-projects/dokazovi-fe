import React from 'react';
import { useHistory } from 'react-router-dom';
import { IExpert } from '../../types';
import { useStyles } from '../../styles/ExpertBlock.styles';

export interface IExpertProps {
  expert: IExpert;
}

export const ExpertBlock: React.FC<IExpertProps> = (props) => {
  const classes = useStyles();

  const history = useHistory();

  const { expert } = props;

  const goExpertPage = () => {
    history.push(`/experts/${expert.id}`);
  };

  return (
    <>
      <img
        src={expert.avatar}
        alt="doctor"
        key={expert.id}
        className={classes.photo}
        onClick={() => goExpertPage()}
        aria-hidden="true"
      />
    </>
  );
};
