import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';

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
}> = (props) => {
  const { children, anchorEl } = props;
  const classes = useStyles();

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        className={classes.popover}
        placement="right-end"
      >
        <div>{children}</div>
      </Popper>
    </div>
  );
};
