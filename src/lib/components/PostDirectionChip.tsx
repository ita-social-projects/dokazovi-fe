import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Chip } from '@material-ui/core';
import { DIRECTION_PROPERTIES } from '../constants/direction-properties';

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
  const history = useHistory();

  const handleClick = () => {
    const direction = Object.values(DIRECTION_PROPERTIES).find(
      (d) => d.label === labelName,
    );
    if (direction?.route) {
      history.push(`/direction/${direction.route}`);
    }
  };

  return (
    <Chip
      className={classes.directionChip}
      label={labelName}
      size="small"
      onClick={handleClick}
    />
  );
};

export default PostDirectionChip;
