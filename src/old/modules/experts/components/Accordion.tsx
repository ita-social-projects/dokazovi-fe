import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useStyles } from '../styles/Accordion.styles';
import { IExpert } from '../../../lib/types';
import email from '../../../lib/images/email.png';
import facebook from '../../../lib/images/facebook_expert_contacts.png';
import { langTokens } from '../../../../locales/localizationInit';

export interface IAccordion {
  expert: IExpert;
}

const Accordion: React.FC<IAccordion> = ({ expert }) => {
  const { t } = useTranslation();
  const [showDetails, setShowDetails] = useState([
    'none',
    'Показати контакти',
    '+',
  ]);

  const classes = useStyles();
  function toggleDetails() {
    if (showDetails[0] === 'none') {
      setShowDetails(['block', t(langTokens.common.hideContacts), '-']);
    } else {
      setShowDetails(['none', t(langTokens.common.showContacts), '+']);
    }
  }

  let mailTo = '';
  if (expert.email) {
    mailTo = `mailto:${expert.email}`;
  }

  return (
    <>
      <div className={classes.accordion}>
        <div
          onClick={toggleDetails}
          className={classes.accordionSummary}
          role="button"
          tabIndex={0}
          onKeyDown={toggleDetails}
        >
          <div className={classes.accordionSummaryTitle}>
            <Typography className={classes.showContacts}>
              {showDetails[1]}
            </Typography>
            <Typography className={classes.expandIcon}>
              {showDetails[2]}
            </Typography>
          </div>
          <div className={classes.headingsDivider} />
        </div>
        <div
          style={{ display: showDetails[0] }}
          className={classes.accordionDetails}
        >
          {expert.email ? (
            <div
              style={{ display: 'flex' }}
              className={classes.accordionDetailsItem}
            >
              <img
                className={classes.contactIcons}
                src={email}
                alt="email"
                height="16px"
                width="16px"
              />
              <Typography variant="body1" className={classes.contacts}>
                <a href={mailTo} className={classes.links}>
                  {expert.email}
                </a>
              </Typography>
            </div>
          ) : null}
          {expert.socialNetworks.map((socialNetwork) => (
            <div
              style={{ display: 'flex' }}
              className={classes.accordionDetailsItem}
              key={socialNetwork}
            >
              <img
                className={classes.contactIcons}
                src={facebook}
                alt="facebook"
                height="16px"
                width="16px"
              />
              <Typography variant="body1" className={classes.contacts}>
                <a
                  href={socialNetwork}
                  target="_blank"
                  rel="noreferrer"
                  className={classes.links}
                >
                  {socialNetwork}
                </a>
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Accordion;
