import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  personalInfo: {
    margin: '0 0 20px 0',
  },
  avatar: {
    margin: '0 0 40px 0',
    width: '280px',
    height: '280px',
  },
  fullName: {
    width: '280px',
    marginBottom: '20px',
  },
  bio: {
    width: '280px',
    marginBottom: '80px',
  },
  contacts: {
    width: '260px',
    fontSize: '14px',
    lineHeight: '14px',
  },
  links: {
    color: '#2051FF',
  },
  accordionWrapper: {
    width: '280px',
    marginBottom: '50px',
  },
  accordion: {
    width: '280px',
    backgroundColor: '#E5E5E5',
  },
  accordionSummary: {
    width: '280px',
    padding: 0,
    userSelect: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  accordionSummaryTitle: {
    display: 'flex',
  },
  accordionDetails: {
    marginTop: '25px',
  },
  accordionDetailsItem: {
    marginTop: '15px',
  },
  showContacts: {
    fontSize: '18px',
    lineHeight: '18px',
    fontWeight: 700,
    fontFamily: 'Raleway',
    width: '260px',
  },
  expandIcon: {
    width: '20px',
    height: '20px',
    fontSize: '36px',
    lineHeight: '10px',
    fontWeight: 700,
    margin: '0px',
    padding: '0px',
  },
  contactIcons: {
    marginRight: '7px',
  },
  headingsDivider: {
    width: '280px',
    height: '4px',
    background: '#000000',
    margin: '2px 0 0 0',
  },
}));
