/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import { Chip } from '@material-ui/core';
import { useStyles } from './PostDirectionChip.styles';

export interface IPostDirectionChipProps {
  labelName?: string;
  backgroundColor?: string;
  handleClick?: () => void;
  handleDelete?: (arg0: string | undefined) => void;
  theOnlyAvailable?: boolean;
}

export const PostDirectionChip: React.FC<IPostDirectionChipProps> = (props) => {
  const classes = useStyles(props);
  const { labelName, handleClick, handleDelete, theOnlyAvailable } = props;

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (handleClick) {
      handleClick();
    }
  };

  const onDeleteClick = (labelName: string | undefined) => {
    if (handleDelete) {
      handleDelete(labelName);
    }
  };

  return (
    <>
      {theOnlyAvailable ? (
        <Chip
          key={labelName}
          className={classes.directionChip}
          label={labelName}
          size="medium"
        />
      ) : (
        <Chip
          key={labelName}
          className={classes.directionChip}
          label={labelName}
          size="medium"
          onClick={onClick}
          onDelete={() => onDeleteClick(labelName)}
        />
      )}
    </>
  );
};
