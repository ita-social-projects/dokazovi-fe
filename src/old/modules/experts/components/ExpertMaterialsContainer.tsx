import { Box, Grid, Typography } from '@material-ui/core';
import { isEmpty, uniq } from 'lodash';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { useTranslation } from 'react-i18next';
import { CheckboxFormStateType } from '../../../lib/components/Filters/CheckboxFilterForm';
import { LoadingContainer } from '../../../lib/components/Loading/LoadingContainer';
import { PostsList } from '../../../lib/components/Posts/PostsList';
import { LoadMoreButton } from '../../../lib/components/LoadMoreButton/LoadMoreButton';
import { useEffectExceptOnMount } from '../../../lib/hooks/useEffectExceptOnMount';
import { usePrevious } from '../../../lib/hooks/usePrevious';
import { useQuery } from '../../../lib/hooks/useQuery';
import ExpertInfo from './ExpertInfo';
import {
  ChipFilterEnum,
  ChipFilterType,
  FilterTypeEnum,
  IDirection,
  IExpert,
  IPostType,
  LoadingStatusEnum,
  LoadMoreButtonTextType,
  QueryTypeEnum,
  filtersStateEnum,
} from '../../../lib/types';
import {
  ActivePostType,
  ActiveDirectionType,
  RequestParamsType,
} from '../../../lib/utilities/API/types';
import {
  getQueryTypeByFilterType,
  mapQueryIdsStringToArray,
} from '../../../lib/utilities/filters';
import {
  getActivePostTypes,
  getActiveDirections,
} from '../../../lib/utilities/API/api';
import { useActions } from '../../../../shared/hooks';
import { CheckboxLeftsideFilterForm } from '../../../lib/components/Filters/CheckboxLeftsideFilterForm';
import { ChipsList } from '../../../../components/Chips/ChipsList/ChipsList';
import { useStyles } from '../styles/ExpertsView.styles';
import {
  selectDirections,
  selectPostTypes,
} from '../../../../models/properties';
import {
  defaultPlural,
  langTokens,
} from '../../../../locales/localizationInit';
import {
  fetchExpertMaterials,
  resetMaterials,
  selectExpertMaterialsLoading,
  selectExpertsData,
} from '../../../../models/expertMaterials';
import { updatePostTypes, updateDir } from '../../utilities/utilityFunctions';
import { selectExpertPostsByIds } from '../../../../models/helpers/selectors';
import { ScreenContext } from '../../../provider/MobileProvider/ScreenContext';
import ExpertMaterialsMobile from './ExpertMaterialsMobile';

export interface IExpertMaterialsContainerProps {
  expertId: number;
  expert: IExpert;
}

const ExpertMaterialsContainer: React.FC<IExpertMaterialsContainerProps> = ({
  expertId,
  expert,
}) => {
  const {
    postIds,
    meta: { isLastPage, pageNumber, totalElements, totalPages },
  } = useSelector(selectExpertsData);
  const { t } = useTranslation();

  const [TheOnlyAvailablePostType, setTheOnlyAvailablePostType] = useState<
    string
  >();
  const [TheOnlyAvailableDirection, setTheOnlyAvailableDirection] = useState<
    string
  >();

  const [checkedFiltersDirections, setCheckedFiltersDirections] = useState<
    CheckboxFormStateType
  >();
  const [checkedFiltersPostTypes, setCheckedFiltersPostTypes] = useState<
    CheckboxFormStateType
  >();
  const loading = useSelector(selectExpertMaterialsLoading);
  const classes = useStyles({ pageYOffset: 0 });
  const query = useQuery();
  const history = useHistory();
  const [page, setPage] = useState(pageNumber);
  const [activePostTypes, setActivePostTypes] = useState<ActivePostType[]>();
  const [activeDirections, setActiveDirections] = useState<
    ActiveDirectionType[]
  >();
  const previous = usePrevious({ page });
  const { mobile } = useContext(ScreenContext);

  const [boundResetMaterials, boundFetchExpertMaterials] = useActions([
    resetMaterials,
    fetchExpertMaterials,
  ]);

  useEffect(() => {
    return function reseting() {
      boundResetMaterials();
    };
  }, []);

  const materials = selectExpertPostsByIds(postIds);

  const postTypes = useSelector(selectPostTypes);

  const postTypesInPlural: IPostType[] = [];

  if (postTypes.length) {
    const el1: IPostType = { ...postTypes[0] };
    const el2: IPostType = { ...postTypes[1] };
    const el3: IPostType = { ...postTypes[2] };

    Object.defineProperty(el1, 'name', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: `${t(langTokens.common.article, defaultPlural)}`,
    });
    Object.defineProperty(el2, 'name', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: `${t(langTokens.common.video)}`,
    });
    Object.defineProperty(el3, 'name', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: `${t(langTokens.common.post, defaultPlural)}`,
    });

    postTypesInPlural.push(el1, el2, el3);
  }

  const directions = useSelector(selectDirections);

  const getDirections = () => {
    if (typeof selectedDirections !== 'string') {
      if (selectedDirections) {
        const names = selectedDirections?.reduce((acc, filter) => {
          acc.push(filter.name);
          return acc;
        }, [] as string[]);
        if (names) {
          return names.join(', ');
        }
      }
    }

    return directions
      .reduce((acc, filter) => {
        acc.push(filter.name);
        return acc;
      }, [] as string[])
      .join(', ');
  };

  const getPostTypes = () => {
    if (typeof selectedPostTypes !== 'string') {
      if (selectedPostTypes) {
        const names = selectedPostTypes?.reduce((acc, filter) => {
          acc.push(filter.name);
          return acc;
        }, [] as string[]);
        if (names) {
          return names.join(', ');
        }
      }
    }

    return postTypesInPlural
      .reduce((acc, filter) => {
        acc.push(filter.name);
        return acc;
      }, [] as string[])
      .join(', ');
  };

  const propertiesLoaded = !isEmpty(postTypesInPlural) && !isEmpty(directions);

  const setFilters = (
    checked: CheckboxFormStateType,
    filterType: FilterTypeEnum,
    disabled?: CheckboxFormStateType,
  ) => {
    if (filterType === 1) {
      if (disabled) {
        setCheckedFiltersDirections(disabled);
      } else {
        setCheckedFiltersDirections(checked);
      }
    } else if (filterType === 0) {
      if (disabled) {
        setCheckedFiltersPostTypes(disabled);
      } else {
        setCheckedFiltersPostTypes(checked);
      }
    }

    const queryType = getQueryTypeByFilterType(filterType);
    const checkedIds = Object.keys(checked).filter((key) => checked[key]);
    const isQuerySame = uniq(Object.values(checked)).length === 1; // removing the query if user checks/unchecks the last box

    query.set(queryType, checkedIds.join(','));
    if (!checkedIds.length || isQuerySame) {
      query.delete(queryType);
    }

    setPage(0);

    if (isQuerySame && uniq(Object.values(checked))[0] === false) {
      query.set(queryType, '0');
      history.push({
        search: query.toString(),
      });
    } else {
      history.push({
        search: query.toString(),
      });
    }
  };

  const handleChipsLogicTransform = (
    name: string,
    filterType: FilterTypeEnum,
  ) => {
    if (filterType === 1) {
      setTheOnlyAvailableDirection(name);
    } else if (filterType === 0) {
      setTheOnlyAvailablePostType(name);
    }
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const fetchData = (appendPosts = false) => {
    const postTypesQuery = query.get(QueryTypeEnum.POST_TYPES);
    const directionsQuery = query.get(QueryTypeEnum.DIRECTIONS);

    const filters: RequestParamsType = {
      page,
      type: mapQueryIdsStringToArray(postTypesQuery),
      directions: mapQueryIdsStringToArray(directionsQuery),
    };

    boundFetchExpertMaterials({ expertId, filters, page, appendPosts });
  };

  async function fetchActivePostTypes() {
    const response = await getActivePostTypes(expertId);
    const arr: ActivePostType[] = response.data;
    setActivePostTypes(arr);
  }

  async function fetchActiveDirections() {
    const response = await getActiveDirections(expertId);
    const arr: ActiveDirectionType[] = response.data;
    setActiveDirections(arr);
  }

  useEffect(() => {
    fetchActivePostTypes();
  }, []);

  useEffect(() => {
    fetchActiveDirections();
  }, []);

  useEffect(() => {
    const appendPosts = previous && previous.page < page;
    fetchData(appendPosts);
  }, [
    query.get(QueryTypeEnum.POST_TYPES),
    query.get(QueryTypeEnum.DIRECTIONS),
    page,
  ]);

  const gridRef = useRef<HTMLDivElement>(null);
  useEffectExceptOnMount(() => {
    if (page > 0) {
      gridRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [postIds]);

  const selectedPostTypesString = query
    .get(QueryTypeEnum.POST_TYPES)
    ?.split(',');
  let selectedPostTypes:
    | IPostType[]
    | filtersStateEnum = postTypesInPlural?.filter((post) =>
    selectedPostTypesString?.includes(post.id.toString()),
  );
  const isMaterialsEmpty = isEmpty(materials);

  if (isEmpty(selectedPostTypes)) {
    if (
      isMaterialsEmpty ||
      (selectedPostTypesString?.length === 1 &&
        selectedPostTypesString?.[0] === '0')
    ) {
      selectedPostTypes = filtersStateEnum.empty;
    } else {
      selectedPostTypes = filtersStateEnum.notEmpty;
    }
  }

  const selectedDirectionsString = query
    .get(QueryTypeEnum.DIRECTIONS)
    ?.split(',');

  let selectedDirections:
    | IDirection[]
    | filtersStateEnum = directions?.filter((post) =>
    selectedDirectionsString?.includes(post.id.toString()),
  );

  if (isEmpty(selectedDirections)) {
    if (
      isMaterialsEmpty ||
      (selectedDirectionsString?.length === 1 &&
        selectedDirectionsString?.[0] === '0')
    ) {
      selectedDirections = filtersStateEnum.empty;
    } else {
      selectedDirections = filtersStateEnum.notEmpty;
    }
  }

  useEffect(() => {
    setCheckedFiltersPostTypes(updatePostTypes(selectedPostTypes, postTypes));
  }, [query.get(QueryTypeEnum.POST_TYPES)]);

  useEffect(() => {
    setCheckedFiltersDirections(updateDir(selectedDirections, directions));
  }, [query.get(QueryTypeEnum.DIRECTIONS)]);

  const handleDeleteChip = (
    key: number | undefined,
    chipsListType: ChipFilterType | undefined,
  ) => {
    let filtersUpdatedByChips: undefined | CheckboxFormStateType;

    if (chipsListType === 'POST_TYPE') {
      filtersUpdatedByChips = { ...checkedFiltersPostTypes };
    } else if (chipsListType === 'DIRECTION') {
      filtersUpdatedByChips = { ...checkedFiltersDirections };
    }
    if (filtersUpdatedByChips && key) {
      filtersUpdatedByChips[key] = false;
      if (chipsListType === 'DIRECTION') {
        setFilters(filtersUpdatedByChips, FilterTypeEnum.DIRECTIONS);
      } else if (chipsListType === 'POST_TYPE') {
        setFilters(filtersUpdatedByChips, FilterTypeEnum.POST_TYPES);
      }
    }
  };

  const disabledDirections = directions.filter(
    (dir) => !activeDirections?.some((el) => el.id === dir.id),
  );

  const disabledPostTypes = postTypes.filter(
    (post) => !activePostTypes?.some((el) => el.id === post.id),
  );

  let materialsData = <PostsList postsList={materials} />;
  if (loading === LoadingStatusEnum.succeeded && materials.length === 0) {
    materialsData = (
      <Grid
        style={{
          fontSize: '24px',
          userSelect: 'none',
          width: '400px',
          height: '200px',
          margin: '100px auto 0',
        }}
        container
        direction="column"
        alignItems="center"
      >
        <SentimentVeryDissatisfiedIcon
          style={{
            height: '65px',
            width: '65px',
            marginBottom: '30px',
          }}
        />
        <Typography
          style={{
            fontWeight: 500,
            fontFamily: 'Raleway',
            fontSize: '24px',
            lineHeight: '32px',
          }}
          align="center"
        >
          {`${t(langTokens.common.noItemsFoundForReques)}.`}
        </Typography>
      </Grid>
    );
  }
  const FilterCheckboxes = propertiesLoaded && (
    <>
      <CheckboxLeftsideFilterForm
        disabledPostTypes={disabledPostTypes}
        expertId={expertId}
        onFormChange={(checked, disabled) =>
          setFilters(checked, FilterTypeEnum.POST_TYPES, disabled)
        }
        possibleFilters={postTypesInPlural}
        selectedFilters={selectedPostTypes}
        filterTitle={t(langTokens.common.byType).toLowerCase()}
        allTitle={t(langTokens.common.allTypes)}
        setTheOnlyAvailableFilter={(name) => {
          handleChipsLogicTransform(name, FilterTypeEnum.POST_TYPES);
        }}
        filterType={QueryTypeEnum.POST_TYPES}
      />
      <CheckboxLeftsideFilterForm
        disabledDirections={disabledDirections}
        expertId={expertId}
        onFormChange={(checked, disabled) =>
          setFilters(checked, FilterTypeEnum.DIRECTIONS, disabled)
        }
        possibleFilters={directions}
        selectedFilters={selectedDirections}
        filterTitle={t(langTokens.common.byDirection).toLowerCase()}
        allTitle={t(langTokens.common.allDirections)}
        setTheOnlyAvailableFilter={(name) => {
          handleChipsLogicTransform(name, FilterTypeEnum.DIRECTIONS);
        }}
        filterType={QueryTypeEnum.DIRECTIONS}
      />
    </>
  );

  const SelectedTypes = (
    <Box className={classes.container}>
      {typeof selectedPostTypes === 'string' ? (
        <Typography
          className={classes.selectedFilters}
          component="div"
          variant="subtitle2"
        >
          {t(langTokens.common.allTypes)}
        </Typography>
      ) : (
        <ChipsList
          filtersPlural={postTypesInPlural}
          checkedNames={getPostTypes()}
          handleDelete={handleDeleteChip}
          chipsListType={ChipFilterEnum.POST_TYPE}
        />
      )}
      <Typography className={classes.divider} component="span">
        |
      </Typography>
      {typeof selectedDirections === 'string' ? (
        <Typography
          className={classes.selectedFilters}
          component="div"
          variant="subtitle2"
        >
          {t(langTokens.common.allDirections)}
        </Typography>
      ) : (
        <ChipsList
          checkedNames={getDirections()}
          handleDelete={handleDeleteChip}
          chipsListType={ChipFilterEnum.DIRECTION}
        />
      )}
      <Typography className={classes.divider} component="span">
        |
      </Typography>
      <Typography
        className={classes.totalFilters}
        component="div"
        variant="subtitle2"
        color="textSecondary"
      >
        {totalElements}{' '}
        {t(langTokens.materials.material, {
          count: totalElements,
        }).toLowerCase()}
      </Typography>
    </Box>
  );

  if (mobile) {
    return (
      <ExpertMaterialsMobile
        expert={expert}
        page={page}
        header={t(langTokens.experts.selectExpertMaterials)}
        loading={loading}
        totalElements={totalElements}
        materials={materials}
        // possibleFilters={postTypesInPlural}
        SelectedTypes={SelectedTypes}
        FilterCheckboxes={FilterCheckboxes}
        setPage={loadMore}
      />
    );
  }

  return (
    <>
      <Grid container direction="row">
        <Grid item container direction="column" xs={6} sm={4} md={3}>
          <ExpertInfo expert={expert} />
          <Typography
            style={{
              fontWeight: 700,
              fontFamily: 'Raleway',
              width: '100%',
              fontSize: '24px',
              margin: '0 0 30px 0',
            }}
          >
            {t(langTokens.experts.selectExpertMaterials)}
          </Typography>
          <div className={classes.scrollabelContainer}>{FilterCheckboxes}</div>
        </Grid>
        <Grid
          className={classes.materialsContainer}
          item
          container
          xs={6}
          sm={8}
          md={9}
          direction="column"
        >
          <div className={classes.selectedFiltersWraper}>{SelectedTypes}</div>
          {page === 0 && loading === LoadingStatusEnum.pending ? (
            <LoadingContainer loading={LoadingStatusEnum.pending} expand />
          ) : (
            <>
              {materialsData}
              {materials.length > 0 ? (
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  ref={gridRef}
                >
                  <LoadMoreButton
                    clicked={loadMore}
                    isLastPage={isLastPage}
                    loading={loading}
                    totalPages={totalPages}
                    totalElements={totalElements}
                    pageNumber={pageNumber}
                    textType={LoadMoreButtonTextType.POST}
                  />
                </Grid>
              ) : null}
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ExpertMaterialsContainer;
