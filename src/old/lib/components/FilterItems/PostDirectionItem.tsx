import React from 'react';
import { Typography, useMediaQuery, useTheme } from '@material-ui/core';

export interface IPostDirectionItemProps {
  labelName?: string;
  handleClick?: () => void;
  isDisabledFilter?: boolean;
  checked?: boolean;
}

export const PostDirectionItem: React.FC<IPostDirectionItemProps> = (props) => {
  const { labelName, handleClick, isDisabledFilter, checked } = props;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (handleClick) {
      handleClick();
    }
  };

  const style: React.CSSProperties = {
    fontFamily: 'Raleway',
    fontStyle: 'normal',
    fontSize: matches ? '14px' : '16px',
    lineHeight: matches ? '16px' : '18px',
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
