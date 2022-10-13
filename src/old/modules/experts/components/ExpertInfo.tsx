import { Avatar, Grid, Typography, Box } from '@material-ui/core';
import React, { useContext } from 'react';
import { IExpert } from '../../../lib/types';
import { useStyles } from '../styles/ExpertInfo.styles';
import Accordion from './Accordion';
import { ScreenContext } from '../../../provider/MobileProvider/ScreenContext';

export interface IExpertInfoProps {
  expert: IExpert;
}

const ExpertInfo: React.FC<IExpertInfoProps> = ({ expert }) => {
  const classes = useStyles();
  const expertFullName = `${expert.firstName} ${expert.lastName}`;
  const { mobile } = useContext(ScreenContext);

  if (mobile) {
    return (
      <>
        <Box className={classes.root}>
          <Box className={classes.avatarSection}>
            <Avatar
              src={expert.avatar}
              alt="Photo"
              variant="circle"
              className={classes.avatar}
            />
          </Box>
          <Box>
            <Typography variant="h3" className={classes.fullName}>
              {expertFullName}
            </Typography>
            <Typography align="justify" className={classes.bio}>
              {expert.bio}
            </Typography>
          </Box>
        </Box>
        <Grid container item className={classes.accordionWrapper}>
          {expert.email || expert.socialNetworks.length > 0 ? (
            <Accordion expert={expert} />
          ) : null}
        </Grid>
      </>
    );
  }

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
          {expert.email || expert.socialNetworks?.length !== 0 ? (
            <Accordion expert={expert} />
          ) : null}
        </Grid>
      </Grid>
    </>
  );
};

export default ExpertInfo;
