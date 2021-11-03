import * as React from 'react';
import { Link } from 'react-router-dom';
import { Popover, Button, ButtonGroup } from '@material-ui/core';
import { Archive, Edit, Person, Today, Visibility } from '@material-ui/icons';
import { archiveAdminPost } from '../../../models/adminLab';
import { useActions } from '../../../shared/hooks';

interface IActionButtons {
  id: number;
}

const ActionButtons: React.FC<IActionButtons> = ({ id }) => {
  const [boundedArchiveAdminPost] = useActions([archiveAdminPost]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClickPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const idPopover = open ? 'simple-popover' : undefined;

  const editPostLink = `/edit-post?id=${id}`;

  const handleClick = (idx) => {
    // eslint-disable-next-line no-console
    console.log(idx);
  };

  return (
    <div>
      <Button
        aria-describedby={idPopover}
        variant="contained"
        onClick={handleClickPopover}
      >
        Actions
      </Button>
      <Popover
        id={idPopover}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <ButtonGroup
          variant="contained"
          orientation="vertical"
          aria-label="vertical contained button group"
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
          <Button startIcon={<Today />} onClick={() => handleClick(id)}>
            Змінити дату публікації
          </Button>
          <Button startIcon={<Person />} onClick={() => handleClick(id)}>
            Змінити автора
          </Button>
          <Button startIcon={<Visibility />} onClick={() => handleClick(id)}>
            Змінити кількість переглядів
          </Button>
        </ButtonGroup>
      </Popover>
    </div>
  );
};

export default ActionButtons;
