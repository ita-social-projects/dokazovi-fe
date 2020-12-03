import React from 'react';
import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { IExpert } from '../types';
import { DIRECTION_PROPERTIES } from '../constants/direction-properties';
import { useStyles } from '../styles/ExpertDataCard.styles';

export interface IExpertDataCardProps {
  expert: IExpert;
}

const ExpertDataCard: React.FC<IExpertDataCardProps> = (props) => {
  const { expert } = props;

  const fullName = `${expert.firstName} ${expert.lastName}`;

  const directionName = expert.mainDirection ? expert.mainDirection.name : '';
  const mainInsitutionCity =
    expert.mainInstitution && expert.mainInstitution.city
      ? expert.mainInstitution.city.name
      : '';
  const mainInsitutionName = expert.mainInstitution
    ? expert.mainInstitution.name
    : '';

  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Box
          style={{
            height: 210,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}
        >
          <Typography variant="h5">{fullName}</Typography>
          {directionName && (
            <Typography variant="body1">
              Спеціалізація: {directionName}
            </Typography>
          )}
          <div>
            <Typography variant="body1" component="h2">
              {mainInsitutionCity}
            </Typography>
            <Typography className={classes.pos} variant="body1" component="h2">
              {mainInsitutionName}
            </Typography>
          </div>
          {expert.lastAddedPost && (
            <div>
              <Typography variant="body2" color="textSecondary">
                Останній доданий матеріал:
              </Typography>
              <Typography variant="h6" component="p">
                {expert.lastAddedPost}
              </Typography>
            </div>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExpertDataCard;
