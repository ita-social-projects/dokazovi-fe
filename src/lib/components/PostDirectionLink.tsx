import React from 'react';
import { useHistory } from 'react-router-dom';
import { IDirection } from '../types';
import PostDirectionChip from './PostDirectionChip';

interface IPostDirectionLinkProps {
  direction: IDirection;
}

const PostDirectionLink: React.FC<IPostDirectionLinkProps> = ({
  direction,
}) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/direction/${direction.name.toLowerCase()}`);
  };

  return (
    <PostDirectionChip
      backgroundColor={direction.color}
      labelName={direction.name}
      handleClick={handleClick}
    />
  );
};

export default PostDirectionLink;
