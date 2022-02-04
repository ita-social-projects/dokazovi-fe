/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext } from 'react';
import { Skeleton } from '@material-ui/lab';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useHistory } from 'react-router-dom';
import { ScreenContext } from 'old/provider/MobileProvider/ScreenContext';
import { IDirection, IOrigin, IPostType } from '../../../old/lib/types';
import { useStyles } from './PostInfo.styles';

export interface IPostInfo {
  info: {
    directions: IDirection[];
    origins: IOrigin[];
    type: IPostType;
    publishedAt: string;
    uniqueViewsCounter?: number;
  };
}

export default function PostInfo({ info }: IPostInfo): JSX.Element {
  const { directions, origins, type, publishedAt, uniqueViewsCounter } = info;
  const classes = useStyles();
  const history = useHistory();
  const { mobile } = useContext(ScreenContext);

  const redirectToMaterialsFiltered = (id: number, root: string) => {
    history.push({ pathname: '/materials', search: `?${root}=${id}` });
  };

  return (
    <div className={classes.root}>
      <ul className={classes.topics} data-testid="topics">
        {directions &&
          directions.map((el) => (
            <li
              data-testid="direction"
              key={el.id}
              onClick={() => redirectToMaterialsFiltered(el.id, 'directions')}
            >
              {el.label}
            </li>
          ))}
      </ul>
      <ul className={classes.origins} data-testid="origins">
        {origins &&
          origins.map(
            (el) =>
              el.name && (
                <li
                  data-testid="origin"
                  className={classes.origin}
                  onClick={() => redirectToMaterialsFiltered(el.id, 'origins')}
                  key={el.id}
                >
                  {el.name}
                </li>
              ),
          )}
        {type && (
          <li
            data-testid="type"
            className={classes.origin}
            onClick={() => redirectToMaterialsFiltered(type.id, 'types')}
          >
            {type.name}
          </li>
        )}
        <li className={classes.createdAt}>{publishedAt}</li>
        <>
          <li className={classes.icon} data-testid="icon">
            <VisibilityIcon fontSize="small" />
          </li>
          <li className={classes.counter} data-testid="counter">
            {uniqueViewsCounter === undefined ? (
              <Skeleton width={40} height={20} data-testid="skeleton" />
            ) : (
              uniqueViewsCounter
            )}
          </li>
        </>
      </ul>
    </div>
  );
}
