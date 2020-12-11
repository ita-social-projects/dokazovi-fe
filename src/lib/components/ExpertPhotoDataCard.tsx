import React from 'react';
import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import PostDirectionChip from './PostDirectionChip';
import { IExpert } from '../types';
import { useStyles } from '../styles/ExpertPhotoDataCard.styles';

export interface IExpertPhotoDataCardProps {
  detailExpert: IExpert;
}

const ExpertPhotoDataCard: React.FC<IExpertPhotoDataCardProps> = (props) => {
  const { detailExpert } = props;

  const fullName = `${detailExpert.firstName} ${detailExpert.lastName}`;

  const mainInsitutionCity =
    detailExpert.mainInstitution && detailExpert.mainInstitution.city
      ? detailExpert.mainInstitution.city.name
      : '';

  const mainInsitutionName = detailExpert.mainInstitution?.name || '';

  const directionName = detailExpert.mainDirection?.name || '';

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
          <CardMedia
            className={classes.photo}
            image={detailExpert.avatar}
            title="doctor"
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
              Спеціалізація: <PostDirectionChip labelName={directionName} />
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
          {detailExpert.lastAddedPost && (
            <div>
              <Typography variant="body2" color="textSecondary">
                Останній доданий матеріал:
              </Typography>
              <Typography variant="h6" component="p">
                {detailExpert.lastAddedPost?.title}
              </Typography>
            </div>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExpertPhotoDataCard;
