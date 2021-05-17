import React from 'react';
import { Chip } from '@material-ui/core';
import { DoneIcon } from '../icons/DoneIcon';
import { useStyles } from './PostDirectionChip.styles';

export interface IPostDirectionChipProps {
  labelName?: string;
  backgroundColor?: string;
  handleClick?: () => void;
  handleDelete?: () => void;
}

const PostDirectionChip: React.FC<IPostDirectionChipProps> = (props) => {
  const classes = useStyles(props);
  const { labelName, handleClick, handleDelete } = props;

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (handleClick) {
      handleClick();
    }
  };

  const onDeleteClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    if (handleDelete) {
      handleDelete();
    }
  };

  return (
    <Chip
      key={labelName}
      className={classes.directionChip}
      label={labelName}
      size="small"
      onClick={onClick}
      onDelete={onDeleteClick}
      deleteIcon={<DoneIcon />}
    />
  );
};

export default PostDirectionChip;

// /* eslint-disable @typescript-eslint/no-shadow */
// import React, { useState } from 'react';
// import { Chip } from '@material-ui/core';
// import { DoneIcon } from '../icons/DoneIcon';
// import { useStyles } from './PostDirectionChip.styles';

// export interface IPostDirectionChipProps {
//   labelName?: string;
//   backgroundColor?: string;
//   handleClick?: () => void;
//   // handleDelete?: () => void;
// }

// const PostDirectionChip: React.FC<IPostDirectionChipProps> = (props) => {
//   const classes = useStyles(props);
//   const { labelName, handleClick } = props;
//   const [arrayOfDirections, addDirection] = useState([]);

//   const handleDelete = (d) => () => {
//     addDirection((arrayOfDirections) =>
//       arrayOfDirections.filter((direction) => direction !== d),
//     );
//   };

//   const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//     e.stopPropagation();
//     if (handleClick) {
//       handleClick();
//     }
//   };

//   // const onDeleteClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//   //   e.stopPropagation();

//   //   if (handleDelete) {
//   //     handleDelete();
//   //   }
//   // };

//   return (
//     <>
//       {arrayOfDirections.length > 0 &&
//         arrayOfDirections.map((d) => (
//           <Chip
//             key={d}
//             className={classes.directionChip}
//             label={d}
//             size="small"
//             onClick={onClick}
//             onDelete={handleDelete(d)}
//             deleteIcon={<DoneIcon />}
//           />
//         ))}
//     </>
//   );
// };

// export default PostDirectionChip;
