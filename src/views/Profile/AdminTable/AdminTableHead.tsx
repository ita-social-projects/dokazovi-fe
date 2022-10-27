import React from 'react';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Visibility } from '@material-ui/icons';
import { selectMeta, setSort } from '../../../models/adminLab';
import { Order, SortBy } from '../../../models/adminLab/types';
import { useActions } from '../../../shared/hooks';
import { useStyles } from './styles/AdminTableHead.styles';
import i18n, { langTokens } from '../../../locales/localizationInit';

interface IContent {
  label: string;
  isSortable: boolean;
  sortKey?: SortBy;
  initialSortOrder?: keyof typeof Order;
  tooltip?: string;
  icon?: JSX.Element;
}

interface IAdminTableHeadProps {
  isAdmin: boolean | undefined;
}

const content: IContent[] = [
  {
    label: i18n.t(langTokens.admin.id),
    isSortable: true,
    sortKey: SortBy.post_id,
  },
  {
    label: i18n.t(langTokens.admin.title),
    isSortable: true,
    sortKey: SortBy.title,
  },
  {
    label: i18n.t(langTokens.admin.status),
    isSortable: false,
  },
  {
    label: i18n.t(langTokens.admin.dateOfStatusChange),
    sortKey: SortBy.modified_at,
    isSortable: true,
    initialSortOrder: Order.desc,
  },
  {
    label: i18n.t(langTokens.admin.direction),
    isSortable: false,
  },
  {
    label: i18n.t(langTokens.admin.author),
    isSortable: true,
    sortKey: SortBy.first_name,
  },
  {
    label: i18n.t(langTokens.admin.views),
    isSortable: true,
    sortKey: SortBy.views,
    initialSortOrder: Order.desc,
    // tooltip: i18n.t(langTokens.admin.viewsFull),
    icon: <Visibility />,
  },
  {
    label: i18n.t(langTokens.admin.realViewsFull),
    isSortable: true,
    sortKey: SortBy.real_views,
    initialSortOrder: Order.desc,
    // tooltip: i18n.t(langTokens.admin.realViewsFull),
    icon: <Visibility />,
  },
  {
    label: i18n.t(langTokens.admin.actions),
    isSortable: false,
  },
];

const AdminTableHead: React.FC<IAdminTableHeadProps> = ({ isAdmin }) => {
  const classes = useStyles();
  const [boundedSetSort] = useActions([setSort]);
  const {
    sort: { order, sortBy },
  } = useSelector(selectMeta);

  const handleSort = (cell: IContent) => {
    const { sortKey, initialSortOrder } = cell;
    let newOrder: keyof typeof Order = initialSortOrder || Order.asc;

    if (sortKey === sortBy) {
      newOrder = order === Order.desc ? Order.asc : Order.desc;
    }

    boundedSetSort({
      sortBy: sortKey as keyof typeof SortBy,
      order: newOrder,
    });
  };

  const cells = content.map((cell) => {
    if (
      !isAdmin &&
      [
        i18n.t(langTokens.admin.views),
        i18n.t(langTokens.admin.author),
      ].includes(cell.label)
    ) {
      return null;
    }
    const { label, isSortable, sortKey, tooltip, icon } = cell;

    return (
      <Tooltip
        key={label}
        title={tooltip || ''}
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
            label
          )}
          {icon}
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

export default AdminTableHead;
