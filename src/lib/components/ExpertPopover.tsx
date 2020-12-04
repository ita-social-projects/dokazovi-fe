import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import { useStyles as styles } from '../../modules/main/styles/MainExpertsView.styles';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  popover: {
    pointerEvents: 'none',
  },
}));

export const ExpertPopover: React.FC<{
  children?: ReactNode;
  anchorEl: HTMLDivElement | null;
  handlePopoverClose: () => void;
}> = (props) => {
  const { children, anchorEl, handlePopoverClose } = props;
  const classes = useStyles();

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  let horizontalAnchor: 'left' | 'right' = 'right';
  let horizontalTransform: 'left' | 'right' = 'left';
  const className = styles();
  if (anchorEl?.className === className.item_10) {
    horizontalAnchor = 'left';
    horizontalTransform = 'right';
  }

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        className={classes.popover}
        anchorOrigin={{
          vertical: 'top',
          horizontal: horizontalAnchor,
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: horizontalTransform,
        }}
        disableRestoreFocus
      >
        {children}
      </Popover>
    </div>
  );
};
