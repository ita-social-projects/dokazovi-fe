import { Avatar, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { IExpert } from '../../../lib/types';
import { useStyles } from '../styles/ExpertInfo.styles';
import Accordion from './Accordion';

export interface IExpertInfoProps {
  expert: IExpert;
}

const ExpertInfo: React.FC<IExpertInfoProps> = ({ expert }) => {
  const classes = useStyles();
  const expertFullName = `${expert.firstName} ${expert.lastName}`;

  return (
    <>
      <Grid
        container
        className={classes.personalInfo}
        data-testid="expert-info"
      >
        <Avatar
          src={expert.avatar}
          alt="Photo"
          variant="square"
          className={classes.avatar}
        />
        <Typography variant="h2" className={classes.fullName}>
          {expertFullName}
        </Typography>
        <Typography variant="body1" align="justify" className={classes.bio}>
          {expert.bio}
        </Typography>
        <Grid container item className={classes.accordionWrapper}>
          {expert.email || expert.socialNetwork ? (
            <Accordion expert={expert} />
          ) : null}
        </Grid>
      </Grid>
    </>
  );
};

export default ExpertInfo;
