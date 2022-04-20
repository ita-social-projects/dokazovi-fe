import React from 'react';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@material-ui/core';
import i18n, { langTokens } from '../../../locales/localizationInit';

interface IContent {
  label: string;
  isSortable: boolean;
  //   sortKey?: keyof typeof SortBy;
  //   initialSortOrder?: keyof typeof Order;
  tooltip?: string;
  icon?: JSX.Element;
}

const content: IContent[] = [
  {
    label: i18n.t(langTokens.admin.id),
    isSortable: false,
  },
  {
    label: i18n.t(langTokens.admin.fullName),
    isSortable: false,
  },
  {
    label: i18n.t(langTokens.admin.region),
    isSortable: false,
  },
  {
    label: i18n.t(langTokens.admin.city),
    isSortable: false,
  },
  {
    label: i18n.t(langTokens.admin.dateOfCreation),
    isSortable: false,
  },
  {
    label: i18n.t(langTokens.admin.dateOfEdition),
    isSortable: false,
  },
  {
    label: i18n.t(langTokens.admin.actions),
    isSortable: false,
  },
];

const AuthorsTableHead: React.FC = () => {
  //   const classes = useStyles();
  //   const [boundedSetSort] = useActions([setSort]);
  //   const {
  //     sort: { order, sortBy },
  //   } = useSelector(selectMeta);

  //   const handleSort = (cell: IContent) => {
  //     const { sortKey, initialSortOrder } = cell;
  //     let newOrder: keyof typeof Order = initialSortOrder || Order.asc;

  //     if (sortKey === sortBy) {
  //       newOrder = order === Order.desc ? Order.asc : Order.desc;
  //     }

  //     boundedSetSort({
  //       sortBy: sortKey as keyof typeof SortBy,
  //       order: newOrder,
  //     });
  //   };

  const cells = content.map((cell) => {
    // if (
    //   !isAdmin &&
    //   [
    //     i18n.t(langTokens.admin.views),
    //     i18n.t(langTokens.admin.author),
    //   ].includes(cell.label)
    // ) {
    //   return null;
    // }
    const { label, isSortable } = cell;

    return (
      <Tooltip
        key={label}
        title=""
        placement="right"
        // classes={{ tooltip: classes.tooltip }}
      >
        <TableCell
        //   sortDirection={sortBy === sortKey ? order : false}
        //   className={
        //     label === i18n.t(langTokens.admin.title) ? classes.titleCell : ''
        //   }
        >
          {/* {isSortable ? (
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
          )} */}
          {/* {icon} */}
          {label}
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
