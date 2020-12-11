import React from 'react';
import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { IExpert } from '../types';
import { useStyles } from '../styles/ExpertPhotoDataCard.styles';

export interface IExpertDataCardProps {
  expert: IExpert;
}

const ExpertDataCard: React.FC<IExpertDataCardProps> = (props) => {
  const { expert } = props;

  const fullName = `${expert.firstName} ${expert.lastName}`;

  const mainInsitutionCity =
    expert.mainInstitution && expert.mainInstitution.city
      ? expert.mainInstitution.city.name
      : '';

  const mainInsitutionName = expert.mainInstitution?.name || '';

  const directionName = expert.mainDirection?.name || '';

  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <img
            src={expert.avatar}
            alt="doctor"
            key={expert.id}
            className={classes.photo}
          />
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            marginLeft: 20,
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
                {expert.lastAddedPost?.title}
              </Typography>
            </div>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExpertDataCard;
