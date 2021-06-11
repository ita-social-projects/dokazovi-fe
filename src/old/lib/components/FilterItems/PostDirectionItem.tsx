import React from 'react';
import { Typography } from '@material-ui/core';

export interface IPostDirectionItemProps {
  labelName?: string;
  handleClick?: () => void;
  isDisabledFilter?: boolean;
  checked?: boolean;
}

export const PostDirectionItem: React.FC<IPostDirectionItemProps> = (props) => {
  const { labelName, handleClick, isDisabledFilter, checked } = props;

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (handleClick) {
      handleClick();
    }
  };

  const style: React.CSSProperties = {
    fontFamily: 'Raleway',
    fontStyle: 'normal',
    fontSize: '16px',
    lineHeight: '18,78px',
    fontWeight: 500,
    color: '#00000',
  };

  if (isDisabledFilter) {
    style.fontWeight = 500;
    style.color = '#767676';
  } else if (checked) {
    style.fontWeight = 'bold';
  }

  return (
    <Typography onClick={onClick} style={style}>
      {labelName}
    </Typography>
  );
};
