import React from 'react';
import { Skeleton } from '@material-ui/lab';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { IDirection, IOrigin, IPostType } from '../../../old/lib/types';
import { useStyles } from './PostInfo.styles';
import { useHistory } from 'react-router-dom';

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

  const redirectToMaterialsFiltered = (id: number, root: string) => {
    history.push({ pathname: '/materials', search: `?${root}=${id}` });
  };

  return (
    <div className={classes.root}>
      <ul className={classes.topics}>
        {directions &&
          directions.map((el) => (
            <li
              key={el.id}
              onClick={() => redirectToMaterialsFiltered(el.id, 'directions')}
            >
              {el.label}
            </li>
          ))}
      </ul>
      <ul className={classes.origins}>
        {origins &&
          origins.map(
            (el) =>
              el.name && (
                <li
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
            className={classes.origin}
            onClick={() => redirectToMaterialsFiltered(type.id, 'types')}
          >
            {type.name}
          </li>
        )}
        <li className={classes.createdAt}>{publishedAt}</li>
        <li className={classes.icon}>
          <VisibilityIcon fontSize="small" />
        </li>
        <li className={classes.counter}>
          {uniqueViewsCounter === undefined ? (
            <Skeleton width={40} height={20} />
          ) : (
            uniqueViewsCounter
          )}
        </li>
      </ul>
    </div>
  );
}
