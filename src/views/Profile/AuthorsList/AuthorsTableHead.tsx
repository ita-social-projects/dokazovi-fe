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
  AutorsListSortBy,
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
    sortKey: AutorsListSortBy.autorId,
    isSortable: true,
    initialSortOrder: AutorsListOrder.desc,
  },
  {
    label: i18n.t(langTokens.admin.fullName),
    sortKey: `${AutorsListSortBy.firstName},${AutorsListSortBy.lastName}`,
    isSortable: true,
    initialSortOrder: AutorsListOrder.desc,
  },
  {
    label: i18n.t(langTokens.admin.region),
    sortKey: AutorsListSortBy.region,
    isSortable: true,
    initialSortOrder: AutorsListOrder.desc,
  },
  {
    label: i18n.t(langTokens.admin.city),
    sortKey: AutorsListSortBy.city,
    isSortable: true,
    initialSortOrder: AutorsListOrder.desc,
  },
  {
    label: i18n.t(langTokens.admin.dateOfCreation),
    sortKey: AutorsListSortBy.createdAt,
    isSortable: true,
    initialSortOrder: AutorsListOrder.desc,
  },
  {
    label: i18n.t(langTokens.admin.dateOfEdition),
    sortKey: AutorsListSortBy.editedAt,
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
      sortBy: sortKey as keyof typeof AutorsListSortBy,
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
            <div className={classes.actions}>{label}</div>
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
