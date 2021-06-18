import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { useStyles } from '../styles/Accordion.styles';
import { IExpert } from '../../../lib/types';
import email from '../../../lib/images/email.png';
import facebook from '../../../lib/images/facebook_expert_contacts.png';

export interface IAccordion {
  expert: IExpert;
}

const Accordion: React.FC<IAccordion> = ({ expert }) => {
  const [showDetails, setShowDetails] = useState([
    'none',
    'Показати контакти',
    '+',
  ]);

  const classes = useStyles();
  function toggleDetails() {
    if (showDetails[0] === 'none') {
      setShowDetails(['block', 'Сховати контакти', '-']);
    } else {
      setShowDetails(['none', 'Показати контакти', '+']);
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
          {expert.email || expert.socialNetwork ? (
            <>
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
              {expert.socialNetwork ? (
                <div
                  style={{ display: 'flex' }}
                  className={classes.accordionDetailsItem}
                >
                  <img
                    className={classes.contactIcons}
                    src={facebook}
                    alt="facebook"
                    height="16px"
                    width="16px"
                  />
                  <Typography variant="body1" className={classes.contacts}>
                    <NavLink
                      to={{
                        pathname: `${expert.socialNetwork}`,
                      }}
                      target="_blank"
                      className={classes.links}
                    >
                      {expert.socialNetwork}
                    </NavLink>
                  </Typography>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Accordion;
