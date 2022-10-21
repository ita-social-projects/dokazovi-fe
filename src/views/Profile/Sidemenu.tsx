import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectAuthorities } from '../../models/authorities';
import i18n, { langTokens } from '../../locales/localizationInit';
import { IProfileMenuOption } from '../../old/lib/types';
import { useStyles } from './styles/Sidemenu.styles';

interface ISidemenuProps {
  selectedOption: IProfileMenuOption | Record<string, never>;
  changeOption: React.Dispatch<
    React.SetStateAction<IProfileMenuOption | Record<string, never>>
  >;
}

const profileMenuOptions: IProfileMenuOption[] = [
  {
    label: i18n.t(langTokens.common.myInfo),
    value: 'info',
  },
  {
    label: i18n.t(langTokens.common.materials),
    value: 'materials',
  },
  {
    label: i18n.t(langTokens.common.passwordChange),
    value: 'passwordChange',
  },
  {
    label: i18n.t(langTokens.common.mail),
    value: 'mail',
  },
];

export const Sidemenu: React.FC<ISidemenuProps> = (props) => {
  const { selectedOption, changeOption } = props;
  const classes = useStyles();
  const { expertId } = useParams<{ expertId: string }>();

  const adminMenuOptions = profileMenuOptions.filter((option) =>
    expertId ? option.value === 'info' : option.value !== 'materials',
  );

  const authorities = useSelector(selectAuthorities);
  const isAdmin = authorities.data?.includes('SET_IMPORTANCE');

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      classes={{
        paper: classes.sidemenuBody,
      }}
    >
      <List className={classes.sidemenuList}>
        {(isAdmin ? adminMenuOptions : profileMenuOptions).map((option) => (
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
