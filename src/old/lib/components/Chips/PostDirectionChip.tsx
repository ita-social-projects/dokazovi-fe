import React from 'react';
import { makeStyles, Chip } from '@material-ui/core';

export interface IPostDirectionChipProps {
  labelName?: string;
  backgroundColor?: string;
  handleClick?: () => void;
}

const useStyles = makeStyles(
  () => ({
    directionChip: (props: IPostDirectionChipProps) => ({
      backgroundColor: props.backgroundColor,
      borderRadius: '15px',
      padding: '0px 8px 0px 8px',
    }),
  }),
  { name: 'PostDirectionChip' },
);

const PostDirectionChip: React.FC<IPostDirectionChipProps> = (props) => {
  const classes = useStyles(props);
  const { labelName, handleClick } = props;

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (handleClick) {
      handleClick();
    }
  };

  return (
    <Chip
      className={classes.directionChip}
      label={labelName}
      size="small"
      onClick={onClick}
    />
  );
};

export default PostDirectionChip;
