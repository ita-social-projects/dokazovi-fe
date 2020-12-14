import { Avatar, Divider, Grid, Typography } from '@material-ui/core';
import React from 'react';
import PostDirectionChip from '../../../lib/components/PostDirectionChip';
import { IExpert } from '../../../lib/types';
import { useStyles } from '../styles/ExpertInfo.styles';

export interface IExpertInfoProps {
  expert: IExpert;
}

const ExpertInfo: React.FC<IExpertInfoProps> = ({ expert }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid container className={classes.personalInfo}>
        <Avatar
          src={expert.avatar}
          alt="Photo"
          variant="square"
          className={classes.avatar}
        />
        <Grid item lg={5}>
          <Typography variant="h4" gutterBottom>
            {`${expert.firstName} ${expert.lastName}`}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="body1" gutterBottom>
            {expert.qualification}
          </Typography>
          <Typography
            className={classes.directionList}
            variant="body1"
            gutterBottom
          >
            Напрямки:{' '}
            {expert.directions?.map((d) => {
              return (
                <PostDirectionChip
                  backgroundColor={d.color}
                  labelName={d.name}
                  key={d.id}
                />
              );
            })}
          </Typography>
          {expert.mainInstitution && (
            <Typography variant="body1" gutterBottom>
              {`${expert.mainInstitution.city.name}, ${expert.mainInstitution.name}`}
            </Typography>
          )}
          <Typography variant="body1" gutterBottom>
            {expert.phone}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {expert.email}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {expert.bio}
      </Grid>
    </Grid>
  );
};

export default ExpertInfo;
