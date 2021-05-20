import React from 'react';
import { useHistory } from 'react-router-dom';
import { IDirection } from '../../types';
import { PostDirectionItem } from './PostDirectionItem';

interface IPostDirectionLinkProps {
  direction: IDirection;
}

export const PostDirectionLink: React.FC<IPostDirectionLinkProps> = ({
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
