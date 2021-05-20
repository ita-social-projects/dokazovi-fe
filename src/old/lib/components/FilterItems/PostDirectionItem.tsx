import React from 'react';
import { Typography } from '@material-ui/core';

export interface IPostDirectionItemProps {
  labelName?: string;
  handleClick?: () => void;
  isEnabledRegion?: boolean;
}

const PostDirectionItem: React.FC<IPostDirectionItemProps> = (props) => {
  const { labelName, handleClick, isEnabledRegion } = props;

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (handleClick) {
      handleClick();
    }
  };

  let style: React.CSSProperties;

  if (isEnabledRegion) {
    style = {
      fontFamily: 'Raleway',
      fontStyle: 'normal',
      fontSize: '16px',
      lineHeight: '18,78px',
      fontWeight: 500,
      color: '#000000',
    };
  } else {
    style = {
      fontFamily: 'Raleway',
      fontStyle: 'normal',
      fontSize: '16px',
      lineHeight: '18px',
      fontWeight: 'normal',
      color: '#767676',
    };
  }

  return (
    <Typography onClick={onClick} style={style}>
      {labelName}
    </Typography>
  );
};

export default PostDirectionItem;
