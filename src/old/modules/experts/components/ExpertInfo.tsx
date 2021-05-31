import { Avatar, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { IExpert } from '../../../lib/types';
import { useStyles } from '../styles/ExpertInfo.styles';

export interface IExpertInfoProps {
  expert: IExpert;
}

const ExpertInfo: React.FC<IExpertInfoProps> = ({ expert }) => {
  const [showContactsTitle, setShowContactsTitle] = useState<string>(
    'Показати контакти',
  );
  const [expandIcon, setExpandIcon] = useState<string>('+');

  const classes = useStyles();
  const expertFullName = `${expert.firstName} ${expert.lastName}`;
  // console.log(expert);
  let mailTo = '';
  if (expert.email) {
    mailTo = `mailto:${expert.email}`;
  }

  return (
    <>
      <Grid container className={classes.personalInfo}>
        <Avatar
          src={expert.avatar}
          alt="Photo"
          variant="square"
          className={classes.avatar}
        />
        <Typography variant="h2" className={classes.fullName}>
          {expertFullName}
        </Typography>
        <Typography variant="body1" align="justify" className={classes.bio}>
          {expert.bio}
        </Typography>
        <Grid container item className={classes.accordionWrapper}>
          <Accordion
            className={classes.accordion}
            onChange={(e, expanded) => {
              if (expanded) {
                setShowContactsTitle('Сховати контакти');
                setExpandIcon('−');
              } else {
                setShowContactsTitle('Показати контакти');
                setExpandIcon('+');
              }
            }}
          >
            <AccordionSummary
              className={classes.accordionSummary}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Grid container item>
                <Typography className={classes.showContacts}>
                  {showContactsTitle}
                </Typography>
                <Typography className={classes.expandIcon}>
                  {expandIcon}
                </Typography>
                <div className={classes.headingsDivider} />
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              {expert.email ? (
                <>
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
                </>
              ) : null}
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </>
  );
};

export default ExpertInfo;
