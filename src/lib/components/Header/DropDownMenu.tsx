import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


interface IDropDownMenu {
  [key: string]: string | React.FC;
}

const dropdownElements =  {"Терапія": "", "Епідеміологія": "", "Вірусологія": "", "Кардіологія": "", "Офтальмологія": "", "Хірургія": ""};

export const DropDownMenu: React.FC<IDropDownMenu>  = (props) => {

export const DropDownMenu: React.FC = () => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(props);

  const allLinks =  Object.entries(dropdownElements).map(([key, value]) => {
  return <MenuItem key={key}>{key}</MenuItem>;
  });

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
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
        {allLinks}
      </Menu>
    </div>
  );
};
