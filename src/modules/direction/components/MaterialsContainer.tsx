import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import PostList from '../../../lib/components/PostsList';
import {
  fetchMaterials,
  setMaterialsLoadingStatus,
} from '../store/directionSlice';
import { RootStateType } from '../../../store/rootReducer';
import { useStyles } from './styles/MaterialsContainer.styles';
import { IDirection } from '../../../lib/types';
import { CheckboxMaterials } from './MaterialsCheckbox';

interface IMaterialsContainerProps {
  direction: IDirection;
}

const MaterialsContainer: React.FC<IMaterialsContainerProps> = ({
  direction,
}) => {
  const classes = useStyles();

  const { posts, meta } = useSelector(
    (state: RootStateType) => state.directions[direction.name].materials,
  );

  const dispatch = useDispatch();

  const dispatchFetchAction = (
    checkedDirections = [1, 2, 3],
    shouldAdd = true,
  ) => {
    dispatch(setMaterialsLoadingStatus(direction));
    dispatch(fetchMaterials(direction, checkedDirections, shouldAdd));
  };

  useEffect(() => {
    dispatchFetchAction();
  }, []);

  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (meta.pageNumber > 0) {
      gridRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [meta.pageNumber]);

  const [checkedBoxes, setChecked] = useState({
    '1': false,
    '2': false,
    '3': false,
  });

  const handler = useCallback(
    _.debounce((checked) => {
      dispatchFetchAction(checked, false);
    }, 500),
    [],
  );

  const handleBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const boxes = { ...checkedBoxes, [event.target.id]: event.target.checked };
    setChecked(boxes);

    const checkedDirections = Object.keys(boxes).filter((key) => {
      return boxes[key] === true;
    });
    const checked = checkedDirections.map((el) => +el);
    handler(checked);
  };

  return (
    <Container>
      <CheckboxMaterials
        handleBoxChange={handleBoxChange}
        checkedBoxes={checkedBoxes}
      />
      <Typography variant="h4">Матеріали</Typography>
      <Grid container spacing={2} direction="row" alignItems="center">
        <PostList postsList={posts} />
      </Grid>
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.showMore}
        ref={gridRef}
      >
        {meta.isLoading && <CircularProgress />}
        {!meta.isLoading && !meta.isLastPage && (
          <Button variant="contained" onClick={() => dispatchFetchAction()}>
            Більше матеріалів
          </Button>
        )}
        {meta.isLastPage && <span>Більше нових матеріалів немає</span>}
      </Grid>
    </Container>
  );
};

export default MaterialsContainer;
