import React from 'react';
import { useHistory } from 'react-router-dom';
import { IDirection } from '../../types';
import PostDirectionItem from './PostDirectionItem';

interface IPostDirectionLinkProps {
  direction: IDirection;
}

const PostDirectionLink: React.FC<IPostDirectionLinkProps> = ({
  direction,
}) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/materials?directions=${direction.id}`);
  };

  return (
    <PostDirectionItem labelName={direction.label} handleClick={handleClick} />
  );
};

export default PostDirectionLink;
