import React from 'react';
import { NavLink } from 'react-router-dom';
import i18n, { langTokens } from '../../locales/localizationInit';
import { useStyles } from './ConditionNav.styles';

export default function ConditionNav(): JSX.Element {
  const classes = useStyles();

  return (
    <ul className={classes.root}>
      <li key="about">
        <NavLink
          to="#about"
          className={classes.link}
          activeClassName={classes.linkSelected}
        >
          {i18n.t(langTokens.footer.aboutPlatform)}
        </NavLink>
      </li>
      <li key="rules">
        <NavLink
          to="#rules"
          className={classes.link}
          activeClassName={classes.linkSelected}
        >
          {i18n.t(langTokens.footer.termsOfUse)}
        </NavLink>
      </li>
      <li key="contacts">
        <NavLink
          to="#contacts"
          className={classes.link}
          activeClassName={classes.linkSelected}
        >
          {i18n.t(langTokens.footer.contacts)}
        </NavLink>
      </li>
    </ul>
  );
}
