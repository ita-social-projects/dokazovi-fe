import React, { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import i18n, { langTokens } from '../../locales/localizationInit';
import { useStyles } from './ConditionNav.styles';

export default function ConditionNav(): JSX.Element {
  const classes = useStyles();

  const { to } = useParams<{ to: string }>();

  useEffect(() => {
    const element: HTMLElement | null = document.getElementById(to);
    element?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, [to]);

  return (
    <ul className={classes.root}>
      <li key="about">
        <NavLink
          to="/conditions/about"
          className={classes.link}
          activeClassName={classes.linkSelected}
        >
          {i18n.t(langTokens.footer.aboutPlatform)}
        </NavLink>
      </li>
      <li key="rules">
        <NavLink
          to="/conditions/rules"
          className={classes.link}
          activeClassName={classes.linkSelected}
        >
          {i18n.t(langTokens.footer.termsOfUse)}
        </NavLink>
      </li>
      <li key="contacts">
        <NavLink
          to="/conditions/contacts"
          className={classes.link}
          activeClassName={classes.linkSelected}
        >
          {i18n.t(langTokens.footer.contacts)}
        </NavLink>
      </li>
    </ul>
  );
}
