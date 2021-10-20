import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import i18n, { langTokens } from '../../locales/localizationInit';
import { selectHeaderVisibility } from '../../models/headerVisibility';
import { useStyles } from './ConditionNav.styles';

export default function ConditionNav(): JSX.Element {
  const classes = useStyles();
  const location = useLocation();
  const isHeaderVisible = useSelector(selectHeaderVisibility);

  const isActive = (hash: string) => location.hash === hash;

  return (
    <ul
      className={`
      ${classes.root} 
      ${String(isHeaderVisible.visibility ? classes.moveRoot : '')}
    `}
    >
      <li key="about">
        <NavLink
          to="#about"
          className={classes.link}
          data-testid="about"
          activeClassName={isActive('#about') ? classes.linkSelected : ''}
        >
          {i18n.t(langTokens.footer.aboutPlatform)}
        </NavLink>
      </li>
      <li key="rules">
        <NavLink
          to="#rules"
          className={classes.link}
          data-testid="rules"
          activeClassName={isActive('#rules') ? classes.linkSelected : ''}
        >
          {i18n.t(langTokens.footer.termsOfUse)}
        </NavLink>
      </li>
      <li key="contacts">
        <NavLink
          to="#contacts"
          className={classes.link}
          data-testid="contacts"
          activeClassName={isActive('#contacts') ? classes.linkSelected : ''}
        >
          {i18n.t(langTokens.footer.contacts)}
        </NavLink>
      </li>
    </ul>
  );
}
