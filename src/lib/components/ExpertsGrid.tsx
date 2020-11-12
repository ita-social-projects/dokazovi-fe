import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { IExpert } from '../types';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // border: '1px solid red',
    maxWidth: '900px',
    margin: '0 auto',
  },
  wrapper: {
    height: '200px',
  },
  element: {
    border: '1px solid black',
    flexGrow: 1,
    marginBottom: theme.spacing(2),
    '&:last-child': { marginBottom: 0 },
  },
  smallElement: {
    border: '1px solid black',
    flexGrow: 1,
    marginBottom: theme.spacing(1),
    '&:last-child': { marginBottom: 0 },
  },
  oneWrapper: {
    width: '22%',
  },
  twoWrapper: {
    width: '13.5%',
  },
  fourWrapper: {
    width: '7%',
  },
}));

export interface IExpertsProps {
  experts: IExpert[];
}

const ExpertsGrid: React.FC<IExpertsProps> = ({ experts }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.wrapper}>
        <Grid item container direction="column" className={classes.oneWrapper}>
          <Grid item className={classes.element}>
            {/* <div></div> */}
          </Grid>
        </Grid>

        <Grid item container direction="column" className={classes.twoWrapper}>
          <Grid item className={classes.element}>
            {/* <div></div> */}
          </Grid>
          <Grid item className={classes.element}>
            {/* <div></div> */}
          </Grid>
        </Grid>

        <Grid item container direction="column" className={classes.oneWrapper}>
          <Grid item className={classes.element}>
            <div />
          </Grid>
        </Grid>

        <Grid item container direction="column" className={classes.fourWrapper}>
          <Grid item className={classes.smallElement} />
          <Grid item className={classes.smallElement} />
          <Grid item className={classes.smallElement} />
          <Grid item className={classes.smallElement} />
        </Grid>

        <Grid
          item
          container
          direction="column"
          spacing={0}
          className={classes.twoWrapper}
        >
          <Grid item className={classes.element}>
            {/* <div></div> */}
          </Grid>
          <Grid item className={classes.element}>
            {/* <div></div> */}
          </Grid>
        </Grid>

        <Grid
          item
          container
          direction="column"
          spacing={0}
          className={classes.oneWrapper}
        >
          <Grid item className={classes.element}>
            <div />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ExpertsGrid;
