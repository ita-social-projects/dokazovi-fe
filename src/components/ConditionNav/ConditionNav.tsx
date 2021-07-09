import React from 'react';
import { NavHashLink } from 'react-router-hash-link';
import i18n, { langTokens } from '../../locales/localizationInit';
import { useStyles } from './ConditionNav.styles';

export default function ConditionNav(): JSX.Element {
  const classes = useStyles();

  return (
    <ul className={classes.root}>
      <li key="about">
        <NavHashLink
          to="#about"
          className={classes.link}
          activeClassName={classes.linkSelected}
        >
          {i18n.t(langTokens.footer.aboutPlatform)}
        </NavHashLink>
      </li>
      <li key="rules">
        <NavHashLink
          to="#rules"
          className={classes.link}
          activeClassName={classes.linkSelected}
        >
          {i18n.t(langTokens.footer.termsOfUse)}
        </NavHashLink>
      </li>
      <li key="contacts">
        <NavHashLink
          to="#contacts"
          className={classes.link}
          activeClassName={classes.linkSelected}
        >
          {i18n.t(langTokens.footer.contacts)}
        </NavHashLink>
      </li>
    </ul>
  );
}
