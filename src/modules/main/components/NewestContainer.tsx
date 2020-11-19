import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Button, Typography } from '@material-ui/core';

import { IMainState } from '../store/mainReducer';
import { IRootState } from '../../../store/rootReducer';
import { loadNewestThunk } from '../store/actions';
import PostPreviewCard from '../../../lib/components/PostPreview/PostPreviewCard';
import { useStyles } from './styles/NewestContainer.style';
import BorderBottom from '../../../lib/components/Border';

const NewestContainer: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const setNewest = () => dispatch(loadNewestThunk());

  const { newestPosts, meta } = useSelector<IRootState, IMainState['newest']>(
    (state) => {
      return state.main.newest;
    },
  );

  useEffect(() => {
    setNewest();
  }, []);

  return (
    <>
      <Container>
        <Typography variant="h4">Найновіше</Typography>
        <Grid container spacing={2} direction="row" alignItems="center">
          {newestPosts.map((post) => (
            <Grid item xs={12} lg={4} md={6} key={post.author?.phone}>
              <PostPreviewCard data={post} />
            </Grid>
          ))}
        </Grid>

        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.showMore}
        >
          {meta.showMore ? (
            <Button variant="contained" onClick={setNewest}>
              Більше матеріалів
            </Button>
          ) : (
            <span>Більше нових матеріалів немає</span>
          )}
        </Grid>
        <BorderBottom />
      </Container>
    </>
  );
};

export default NewestContainer;
