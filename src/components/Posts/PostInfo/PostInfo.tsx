import React from 'react';
import { Skeleton } from '@material-ui/lab';
import VisibilityIcon from '@material-ui/icons/Visibility';
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
  const {
    directions,
    origins,
    type,
    publishedAt,
    uniqueViewsCounter = 0,
  } = info;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ul className={classes.topics}>
        {directions && directions.map((el) => <li key={el.id}>{el.label}</li>)}
      </ul>
      <ul className={classes.origins}>
        {origins &&
          origins.map(
            (el) =>
              el.name && (
                <li className={classes.origin} key={el.id}>
                  {el.name}
                </li>
              ),
          )}
        {type && <li className={classes.origin}>{type.name}</li>}
        <li className={classes.createdAt}>{publishedAt}</li>
        <li className={classes.icon}>
          <VisibilityIcon fontSize="small" />
        </li>
        <li className={classes.counter}>
          {uniqueViewsCounter || <Skeleton width={40} height={20} />}
        </li>
      </ul>
    </div>
  );
}
