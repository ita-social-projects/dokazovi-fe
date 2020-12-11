import React from 'react';
import { makeStyles, Chip } from '@material-ui/core';

export interface IPostDirectionChipProps {
  labelName?: string;
  backgroundColor?: string;
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
  const { labelName } = props;

  return (
    <Chip className={classes.directionChip} label={labelName} size="small" />
  );
};

export default PostDirectionChip;
