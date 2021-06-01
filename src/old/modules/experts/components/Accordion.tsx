import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { useStyles } from '../styles/Accordion.styles';
import { IExpert } from '../../../lib/types';

export interface IAccordion {
  expert: IExpert;
}

const Accordion: React.FC<IAccordion> = ({ expert }) => {
  const [showDetails, setShowDetails] = useState('none');
  const [showContactsTitle, setShowContactsTitle] = useState<string>(
    'Показати контакти',
  );
  const [expandIcon, setExpandIcon] = useState<string>('+');

  const classes = useStyles();
  function toggleDetails() {
    if (showDetails === 'none') {
      setShowDetails('block');
      setShowContactsTitle('Сховати контакти');
      setExpandIcon('−');
    } else {
      setShowDetails('none');
      setShowContactsTitle('Показати контакти');
      setExpandIcon('+');
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
          onKeyDown={function () {}}
        >
          <div className={classes.accordionSummaryTitle}>
            <Typography className={classes.showContacts}>
              {showContactsTitle}
            </Typography>
            <Typography className={classes.expandIcon}>{expandIcon}</Typography>
          </div>
          <div className={classes.headingsDivider} />
        </div>
        <div
          style={{ display: showDetails }}
          className={classes.accordionDetails}
        >
          {expert.email || expert.socialNetwork ? (
            <>
              {expert.email ? (
                <div
                  style={{ display: 'flex' }}
                  className={classes.accordionDetailsItem}
                >
                  <svg
                    className={classes.contactIcons}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 0V16H16V0H0ZM3.28316 3.93743H12.7168C12.8981 3.93743 13.0696 
                        3.98079 13.2233 4.05173L7.99901 9.12822L2.7767 4.05173C2.93041 
                        3.98079 3.10186 3.93743 3.28316 3.93743ZM2.0771 10.8545V5.14349C2.0771 
                        5.07846 2.08696 5.0154 2.09681 4.95233L5.55142 8.31038L2.26629 
                        11.5009C2.14805 11.3137 2.0771 11.093 2.0771 10.8545ZM3.29696 
                        12.0606L6.35349 9.09077L7.60882 10.3106C7.71721 10.417 7.8591 10.4683 
                        7.99901 10.4683C8.13893 10.4683 8.28082 10.4151 8.38921 10.3106L9.64454 
                        9.09077L12.703 12.0606H3.29696ZM13.9229 10.8545C13.9229 11.093 13.852 
                        11.3137 13.7317 11.5009L10.4486 8.31038L13.9032 4.95233C13.913 5.0154 
                        13.9229 5.07846 13.9229 5.14349V10.8545Z"
                      fill="black"
                    />
                  </svg>
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
                  <svg
                    className={classes.contactIcons}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 0V16H6.68343V10.0023H5.13371V7.93143H6.72V5.92914C6.72 4.84114 7.61143 
                    3.82171 9.06514 3.82171H11.1131V5.80571H9.72343C9.088 5.80571 9.07429 
                    5.87886 9.07429 6.4L9.06971 7.92686H11.1131L10.8846 9.99771H9.03314V15.36V16H16V0H0Z"
                      fill="black"
                    />
                  </svg>
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
