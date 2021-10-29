import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { useStyles } from './styles/MaterialsActionButton.styles';

interface IMaterialsActionButton {
  title: string;
  icon: JSX.Element;
  onClick: (number) => void;
}

const MaterialsActionButton: React.FC<IMaterialsActionButton> = ({
  title,
  icon,
  onClick,
}) => {
  const classes = useStyles();

  return (
    <Tooltip
      title={title}
      placement="top-end"
      classes={{
        tooltip: classes.tooltip,
      }}
    >
      <IconButton
        aria-label={title}
        classes={{
          root: classes.icon,
        }}
        onClick={onClick}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default MaterialsActionButton;
