import React, { ReactNode, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  popover: {
    pointerEvents: 'none',
  },
}));

export const ExpertPopover: React.FC<{
  // children?: React.FC<IExpertProps>;
  children?: ReactNode;
  anchorEl: HTMLDivElement | null;
  handlePopoverClose: () => void;
}> = (props) => {
  const { children, anchorEl, handlePopoverClose } = props;
  const classes = useStyles();

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        className={classes.popover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        disableRestoreFocus
      >
        {/* <Typography className={classes.typography}>
          The content of the Popover.
        </Typography> */}
        {children}
      </Popover>
    </div>
  );
};
