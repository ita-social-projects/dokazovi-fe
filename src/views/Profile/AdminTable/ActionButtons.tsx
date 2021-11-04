import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  ClickAwayListener,
  Button,
  ButtonGroup,
  Popper,
} from '@material-ui/core';
import {
  Archive,
  Edit,
  Person,
  Today,
  Visibility,
  MoreVert,
} from '@material-ui/icons';
import { archiveAdminPost } from '../../../models/adminLab';
import { useActions } from '../../../shared/hooks';
import { useStyles } from './styles/ActionButtons.styles';

interface IActionButtons {
  id: number;
}

const ActionButtons: React.FC<IActionButtons> = ({ id }) => {
  const classes = useStyles();
  const [boundedArchiveAdminPost] = useActions([archiveAdminPost]);
  const editPostLink = `/edit-post?id=${id}`;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isPopperOpen = Boolean(anchorEl);
  const popperID = isPopperOpen ? 'simple-popper' : undefined;

  const handleOpenPopper = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClosePopper = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        className={classes.mainButton}
        startIcon={<MoreVert />}
        aria-describedby={popperID}
        variant="contained"
        onClick={handleOpenPopper}
      />
      <Popper
        id={popperID}
        open={isPopperOpen}
        anchorEl={anchorEl}
        placement="bottom-end"
      >
        <ClickAwayListener onClickAway={handleClosePopper}>
          <ButtonGroup
            className={classes.btnGroup}
            variant="contained"
            orientation="vertical"
            aria-label="vertical contained button group"
            onClick={handleClosePopper}
          >
            <Button startIcon={<Edit />}>
              <Link to={editPostLink} target="_blank">
                Редагувати
              </Link>
            </Button>
            <Button
              startIcon={<Archive />}
              onClick={() => boundedArchiveAdminPost({ id })}
            >
              Архівувати
            </Button>
            <Button startIcon={<Today />}>Змінити дату публікації</Button>
            <Button startIcon={<Person />}>Змінити автора</Button>
            <Button startIcon={<Visibility />}>
              Змінити кількість переглядів
            </Button>
          </ButtonGroup>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

export default ActionButtons;
