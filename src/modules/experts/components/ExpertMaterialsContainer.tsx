import React, { useEffect, useRef } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import BorderBottom from '../../../lib/components/Border';
import LoadingInfo from '../../../lib/components/LoadingInfo';
import PostsList from '../../../lib/components/PostsList';
import {
  fetchExpertMaterials,
  fetchInitialMaterials,
  setupExpertMaterialsID,
  setMaterialsTypes,
} from '../store/expertsSlice';
import { RootStateType } from '../../../store/rootReducer';
import useEffectExceptOnMount from '../../../lib/hooks/useEffectExceptOnMount';
import { useStyles } from '../styles/ExpertProfileView.styles';
import { PostTypeFilter } from '../../direction/components/PostTypesFilter';
import { selectPostsByIds } from '../../../store/selectors';
import LoadMorePostsButton from '../../../lib/components/LoadMorePostsButton';
import CheckBoxFilterForm from '../../../lib/components/CheckBoxFilterForm';
import { LoadingStatusEnum } from '../../../lib/types';

export interface IExpertMaterialsContainerProps {
  expertId: string;
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ExpertMaterialsContainer: React.FC<IExpertMaterialsContainerProps> = ({
  expertId,
}) => {
  const dispatch = useDispatch();
  console.log('materials container render');

  // TODO: fix
  dispatch(setupExpertMaterialsID(expertId));

  const classes = useStyles();
  const gridRef = useRef<HTMLDivElement>(null);
  const query = useQuery();
  const history = useHistory();

  const expertData = useSelector(
    (state: RootStateType) => state.experts.materials[expertId],
  );
  const {
    postIds,
    meta: { loading, isLastPage, pageNumber },
    // filters,
  } = expertData;

  const materials = selectPostsByIds(postIds);
  const postTypes = useSelector(
    (state: RootStateType) => state.properties.postTypes,
  );

  const setFilters = (checked: string[]) => {
    console.log('setFilters', checked);
    // query.set('types', checked.join(','));
    // if (checked.length === 0) query.delete('types');

    // history.push({
    //   search: query.toString(),
    // });
  };

  const fetchMaterial = () => {
    const filters = {
      page: pageNumber,
      types: query.get('types'),
    };
    dispatch(fetchExpertMaterials(Number(expertId), filters));
  };

  useEffect(() => {
    fetchMaterial();
  }, [expertId, query.get('types')]);

  // useEffect(() => {
  //   fetchMaterial();

  //   return () => {
  //     history.replace({
  //       search: '',
  //     });
  //   };
  // }, [history]);

  // useEffect(() => {
  //   return () => {
  //     dispatch(
  //       setMaterialsTypes({
  //         types: { value: undefined },
  //         expertId,
  //       }),
  //     );
  //   };
  // }, [expertId]);

  useEffectExceptOnMount(() => {
    if (pageNumber > 0) {
      gridRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [pageNumber]);

  const selectedTypesString = query.get('types')?.split(',');
  const selectedFilters = postTypes?.filter((post) =>
    selectedTypesString?.includes(post.id.toString()),
  );

  return (
    <>
      <Container className={classes.container}>
        <Typography variant="h4">Матеріали</Typography>
        {/* <PostTypeFilter setFilters={setFilters} /> */}
        {loading === LoadingStatusEnum.succeeded && postTypes && (
          <CheckBoxFilterForm
            onFormChange={setFilters}
            possibleFilters={postTypes}
            selectedFilters={selectedFilters}
          />
        )}
        <Grid container spacing={2} direction="row" alignItems="center">
          {loading === LoadingStatusEnum.succeeded && (
            <PostsList postsList={materials} />
          )}
          <PostsList postsList={materials} />
        </Grid>
        <Grid container direction="column" alignItems="center">
          {loading === LoadingStatusEnum.pending && (
            <LoadingInfo loading={loading} />
          )}
        </Grid>
        <Grid container direction="column" alignItems="center" ref={gridRef}>
          <LoadMorePostsButton
            clicked={fetchMaterial}
            isLastPage={isLastPage}
            loading={loading}
          />
        </Grid>
        <BorderBottom />
      </Container>
    </>
  );
};

export default ExpertMaterialsContainer;
