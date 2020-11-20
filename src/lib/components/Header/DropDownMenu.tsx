import React from 'react';
// import './Header.css';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export const DropDownMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        // className="drop-down-name"
        color="inherit"
        variant="text"
      >
        Напрямки
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>Терапія</MenuItem>
        <MenuItem>Епідеміологія</MenuItem>
        <MenuItem>Вірусологія</MenuItem>
        <MenuItem>Кардіологія</MenuItem>
        <MenuItem>Офтальмологія</MenuItem>
        <MenuItem>Хірургія</MenuItem>
      </Menu>
    </div>
  );
};
