import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useStyles } from './styles/Sidemenu.styles';
import { IProfileMenuOption } from '../../old/lib/types';

interface ISidemenuProps {
  selectedOption: IProfileMenuOption | Record<string, never>;
  changeOption: React.Dispatch<
    React.SetStateAction<IProfileMenuOption | Record<string, never>>
  >;
}

const profileMenuOptions: IProfileMenuOption[] = [
  {
    label: 'Моя інфо',
    value: 'info',
  },
  {
    label: 'Матеріли',
    value: 'materials',
  },
  {
    label: 'Безпека',
    value: 'security',
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
      <List>
        {profileMenuOptions.map((option) => (
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
