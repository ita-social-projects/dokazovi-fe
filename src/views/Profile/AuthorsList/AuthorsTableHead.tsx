import React from 'react';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@material-ui/core';
import i18n, { langTokens } from '../../../locales/localizationInit';
import { useActions } from '../../../shared/hooks';
import { setSort } from '../../../models/experts';
import { useStyles } from './styles/AuthorsTableHead.styles';
import {
  AutorsListOrder,
  AuthorsListSortBy,
  ISortAutorsList,
} from '../../../models/experts/types';

interface IContent {
  label: string;
  isSortable: boolean;
  sortKey?: string;
  initialSortOrder?: keyof typeof AutorsListOrder;
  tooltip?: string;
}

const content: IContent[] = [
  {
    label: i18n.t(langTokens.admin.id),
    sortKey: AuthorsListSortBy.autorId,
    isSortable: true,
    initialSortOrder: AutorsListOrder.desc,
  },
  {
    label: i18n.t(langTokens.admin.fullName),
    sortKey: AuthorsListSortBy.fullName,
    isSortable: true,
    initialSortOrder: AutorsListOrder.desc,
  },
  {
    label: i18n.t(langTokens.admin.region),
    sortKey: AuthorsListSortBy.region,
    isSortable: true,
    initialSortOrder: AutorsListOrder.desc,
  },
  {
    label: i18n.t(langTokens.admin.city),
    sortKey: AuthorsListSortBy.city,
    isSortable: true,
    initialSortOrder: AutorsListOrder.desc,
  },
  {
    label: i18n.t(langTokens.admin.dateOfCreation),
    sortKey: AuthorsListSortBy.createdAt,
    isSortable: true,
    initialSortOrder: AutorsListOrder.desc,
  },
  {
    label: i18n.t(langTokens.admin.dateOfEdition),
    sortKey: AuthorsListSortBy.editedAt,
    isSortable: true,
    initialSortOrder: AutorsListOrder.desc,
  },
  {
    label: i18n.t(langTokens.admin.actions),
    isSortable: false,
  },
];

const AuthorsTableHead: React.FC<ISortAutorsList> = (props) => {
  const classes = useStyles();
  const [boundedSetSort] = useActions([setSort]);
  const { order, sortBy } = props;

  const handleSort = (cell: IContent) => {
    const { sortKey, initialSortOrder } = cell;
    let newOrder: keyof typeof AutorsListOrder =
      initialSortOrder || AutorsListOrder.asc;

    if (sortKey === sortBy) {
      newOrder =
        order === AutorsListOrder.desc
          ? AutorsListOrder.asc
          : AutorsListOrder.desc;
    }
    boundedSetSort({
      order: newOrder,
      sortBy: sortKey,
    });
  };

  const cells = content.map((cell) => {
    const { label, isSortable, sortKey } = cell;

    return (
      <Tooltip
        key={label}
        title=""
        placement="right"
        classes={{ tooltip: classes.tooltip }}
      >
        <TableCell
          sortDirection={sortBy === sortKey ? order : false}
          className={
            label === i18n.t(langTokens.admin.title) ? classes.titleCell : ''
          }
        >
          {isSortable ? (
            <TableSortLabel
              active={sortBy === sortKey}
              direction={order}
              className={classes.sortable}
              onClick={() => handleSort(cell)}
            >
              {label}
            </TableSortLabel>
          ) : (
            <span className={classes.actions}>{label}</span>
          )}
        </TableCell>
      </Tooltip>
    );
  });

  return (
    <TableHead>
      <TableRow>{cells}</TableRow>
    </TableHead>
  );
};

export default AuthorsTableHead;
