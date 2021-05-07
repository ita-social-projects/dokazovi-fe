import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { IExpert } from '../../types';
import { useStyles } from '../../styles/ExpertDataCard.styles';

export interface IExpertDataCardProps {
  expert: IExpert;
}

export const ExpertDataCard: React.FC<IExpertDataCardProps> = (props) => {
  const { expert } = props;
  const history = useHistory();
  const fullName = `${expert.firstName} ${expert.lastName}`;

  const goExpertPage = () => {
    history.push(`/experts/${expert.id}`);
  };

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Typography className={classes.name} onClick={goExpertPage} variant="h4">
        {fullName}
      </Typography>
      <Typography variant="h6" gutterBottom className={classes.qualification}>
        {expert.qualification && `${expert.qualification}`}
        {expert.mainInstitution &&
          `, ${expert.mainInstitution.name}, ${expert.mainInstitution.city.name}`}
      </Typography>
    </Card>
  );
};
