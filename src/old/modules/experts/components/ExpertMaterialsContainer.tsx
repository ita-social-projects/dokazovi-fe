import { Grid, Typography, Box } from '@material-ui/core';
import { isEmpty, uniq } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { CheckboxFormStateType } from '../../../lib/components/Filters/CheckboxFilterForm';
import { LoadingContainer } from '../../../lib/components/Loading/LoadingContainer';
import { PostsList } from '../../../lib/components/Posts/PostsList';
import { LoadMoreButton } from '../../../lib/components/LoadMoreButton/LoadMoreButton';
import { useEffectExceptOnMount } from '../../../lib/hooks/useEffectExceptOnMount';
import { usePrevious } from '../../../lib/hooks/usePrevious';
import { useQuery } from '../../../lib/hooks/useQuery';
import ExpertInfo from './ExpertInfo';
import {
  FilterTypeEnum,
  IPostType,
  IDirection,
  LoadingStatusEnum,
  LoadMoreButtonTextType,
  QueryTypeEnum,
  IExpert,
  ChipFilterType,
  ChipFilterEnum,
} from '../../../lib/types';
import {
  RequestParamsType,
  ActivePostType,
} from '../../../lib/utilities/API/types';
import {
  getQueryTypeByFilterType,
  mapQueryIdsStringToArray,
} from '../../../lib/utilities/filters';
import { RootStateType } from '../../../../models/rootReducer';
import {
  fetchExpertMaterials,
  resetMaterials,
  selectExpertsData,
  selectLoadingExpertsPosts,
} from '../../../../models/experts';
import { getActivePostTypes } from '../../../lib/utilities/API/api';
import { useActions } from '../../../../shared/hooks';
import { CheckboxLeftsideFilterForm } from '../../../lib/components/Filters/CheckboxLeftsideFilterForm';
import { ChipsList } from '../../../../components/Chips/ChipsList/ChipsList';
import { useStyles } from '../styles/ExpertsView.styles';
import { declOfNum } from '../../utilities/declOfNum';
import {
  selectDirections,
  selectPostTypes,
} from '../../../../models/properties';

export interface IExpertMaterialsContainerProps {
  expertId: number;
  expert: IExpert;
}

const ExpertMaterialsContainer: React.FC<IExpertMaterialsContainerProps> = ({
  expertId,
  expert,
}) => {
  const {
    posts,
    postIds,
    meta: { isLastPage, pageNumber, totalElements, totalPages },
  } = useSelector(selectExpertsData);

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

  const loading = useSelector(selectLoadingExpertsPosts);
  const classes = useStyles();
  const query = useQuery();
  const history = useHistory();
  const [page, setPage] = useState(pageNumber);
  const [activePostTypes, setActivePostTypes] = useState<ActivePostType[]>();
  const previous = usePrevious({ page });

  const [boundResetMaterials] = useActions([resetMaterials]);

  useEffect(() => {
    boundResetMaterials();
  }, [expertId]);

  const allMaterials = Object.values(posts);
  const materials = [...allMaterials].filter((el) => {
    if (postIds.find((elem) => elem === el.id)) {
      return true;
    }
    return false;
  });

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
      value: 'Статті',
    });
    Object.defineProperty(el2, 'name', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: 'Відео',
    });
    Object.defineProperty(el3, 'name', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: 'Дописи',
    });

    postTypesInPlural.push(el1, el2, el3);
  }

  const directions = useSelector(selectDirections);

  const getDirections = () => {
    if (selectedDirections) {
      const names = selectedDirections?.reduce((acc, filter) => {
        acc.push(filter.name);
        return acc;
      }, [] as string[]);
      if (names) {
        return names.join(', ');
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
    if (selectedPostTypes) {
      const names = selectedPostTypes?.reduce((acc, filter) => {
        acc.push(filter.name);
        return acc;
      }, [] as string[]);
      if (names) {
        return names.join(', ');
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
  ) => {
    if (filterType === 1) {
      setCheckedFiltersDirections(checked);
    } else if (filterType === 0) {
      setCheckedFiltersPostTypes(checked);
    }

    const queryType = getQueryTypeByFilterType(filterType);
    const checkedIds = Object.keys(checked).filter((key) => checked[key]);
    const isQuerySame = uniq(Object.values(checked)).length === 1; // removing the query if user checks/unchecks the last box

    query.set(queryType, checkedIds.join(','));
    if (!checkedIds.length || isQuerySame) {
      query.delete(queryType);
    }

    setPage(0);

    history.push({
      search: query.toString(),
    });
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

  const [boundFetchExpertMaterials] = useActions([fetchExpertMaterials]);

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

  useEffect(() => {
    fetchActivePostTypes();
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
    | undefined = postTypesInPlural?.filter((post) =>
    selectedPostTypesString?.includes(post.id.toString()),
  );
  selectedPostTypes = !isEmpty(selectedPostTypes)
    ? selectedPostTypes
    : undefined;

  const selectedDirectionsString = query
    .get(QueryTypeEnum.DIRECTIONS)
    ?.split(',');

  let selectedDirections:
    | IDirection[]
    | undefined = directions?.filter((post) =>
    selectedDirectionsString?.includes(post.id.toString()),
  );
  selectedDirections = !isEmpty(selectedDirections)
    ? selectedDirections
    : undefined;

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

  const disabledDirections = directions.filter((dir) => {
    if (expert.directions?.find((el) => el.id === dir.id)) {
      return false;
    }
    return true;
  });

  const disabledPostTypes = postTypes.filter((post) => {
    if (activePostTypes?.length) {
      if (activePostTypes?.find((el) => el.id === post.id)) {
        return false;
      }
      return true;
    }
    return false;
  });

  let materialsData = <PostsList postsList={materials} />;
  if (materials.length === 0) {
    materialsData = (
      <Grid
        style={{
          position: 'sticky',
          top: '45vh',
          fontSize: '24px',
          userSelect: 'none',
          width: '400px',
          height: '200px',
          margin: '0 auto',
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
          На жаль, даних, що відповідають вашому запиту, не знайдено.
        </Typography>
      </Grid>
    );
  }

  return (
    <>
      <Grid container direction="row">
        <Grid item container direction="column" xs={3}>
          <ExpertInfo expert={expert} />
          <Typography
            style={{
              fontWeight: 700,
              fontFamily: 'Raleway',
              width: '280px',
              fontSize: '24px',
              margin: '0 0 30px 0',
            }}
          >
            Вибрати матеріали автора
          </Typography>
          {propertiesLoaded && (
            <>
              <CheckboxLeftsideFilterForm
                disabledPostTypes={disabledPostTypes}
                expertId={expertId}
                onFormChange={(checked) =>
                  setFilters(checked, FilterTypeEnum.POST_TYPES)
                }
                possibleFilters={postTypesInPlural}
                selectedFilters={selectedPostTypes}
                filterTitle="за типом"
                allTitle="Всі типи"
                setTheOnlyAvailableFilter={(name) => {
                  handleChipsLogicTransform(name, FilterTypeEnum.POST_TYPES);
                }}
              />
              <CheckboxLeftsideFilterForm
                disabledDirections={disabledDirections}
                expertId={expertId}
                onFormChange={(checked) =>
                  setFilters(checked, FilterTypeEnum.DIRECTIONS)
                }
                possibleFilters={directions}
                selectedFilters={selectedDirections}
                filterTitle="за темою"
                allTitle="Всі теми"
                setTheOnlyAvailableFilter={(name) => {
                  handleChipsLogicTransform(name, FilterTypeEnum.DIRECTIONS);
                }}
              />
            </>
          )}
        </Grid>
        <Grid item container xs={9} direction="column">
          <Box className={classes.container}>
            <Typography
              className={classes.chipsHeading}
              component="div"
              variant="subtitle2"
            >
              Вибрано матеріали автора:
            </Typography>
            {selectedPostTypes === undefined && !TheOnlyAvailablePostType ? (
              <Typography
                className={classes.selectedFilters}
                component="div"
                variant="subtitle2"
              >
                Всі типи
              </Typography>
            ) : (
              <ChipsList
                TheOnlyAvailablePostType={TheOnlyAvailablePostType}
                filtersPlural={postTypesInPlural}
                checkedNames={getPostTypes()}
                handleDelete={handleDeleteChip}
                chipsListType={ChipFilterEnum.POST_TYPE}
              />
            )}
            <Typography className={classes.divider} component="span">
              |
            </Typography>
            {selectedDirections === undefined && !TheOnlyAvailableDirection ? (
              <Typography
                className={classes.selectedFilters}
                component="div"
                variant="subtitle2"
              >
                Всі теми
              </Typography>
            ) : (
              <ChipsList
                TheOnlyAvailableDirection={TheOnlyAvailableDirection}
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
              {declOfNum(totalElements, [
                'матеріал',
                'матеріали',
                'матеріалів',
              ])}
            </Typography>
          </Box>
          {page === 0 && loading === LoadingStatusEnum.pending ? (
            <LoadingContainer loading={loading} expand />
          ) : (
            <>
              {materialsData}
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
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ExpertMaterialsContainer;
