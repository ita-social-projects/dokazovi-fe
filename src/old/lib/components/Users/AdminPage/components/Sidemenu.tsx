import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useStyles } from '../styles/Sidemenu.styles';
import { IAdminMenuOption } from '../../../../types';

interface ISidemenuProps {
  selectedOption: IAdminMenuOption | Record<string, never>;
  changeOption: React.Dispatch<
    React.SetStateAction<IAdminMenuOption | Record<string, never>>
  >;
}

const adminMenuOptions: IAdminMenuOption[] = [
  {
    section: 'Головна',
    label: 'Список авторів',
    value: 'authors',
  },
  {
    section: 'Головна',
    label: 'Керування матеріалами',
    value: 'materials',
  },
  {
    section: 'Головна',
    label: 'Важливе',
    value: 'important',
  },
];

const Sidemenu: React.FC<ISidemenuProps> = (props) => {
  const { selectedOption, changeOption } = props;
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      classes={{
        paper: classes.sidemenuBody,
      }}
    >
      <Typography
        component="h1"
        align="center"
        className={classes.sidemenuHeader}
      >
        Налаштування:
      </Typography>
      <Typography component="span" className={classes.menuCategory}>
        Головна
      </Typography>
      <List>
        {adminMenuOptions.map((option) => (
          <ListItem
            button
            key={option.value}
            selected={option.value === selectedOption.value}
            onClick={() => changeOption(option)}
          >
            <ListItemText primary={option.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidemenu;
