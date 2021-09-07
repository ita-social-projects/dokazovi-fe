import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  fullName: {
    marginBottom: '20px',
  },
  contacts: {
    width: '91%',
    fontSize: '14px',
    lineHeight: '14px',
    wordWrap: 'break-word',
  },
  links: {
    color: '#2051FF',
  },
  accordionWrapper: {
    marginBottom: '50px',
  },
  accordion: {
    width: '100%',
    backgroundColor: '#E5E5E5',
  },
  accordionSummary: {
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
    width: '91%',
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
    height: '4px',
    background: '#000000',
    margin: '2px 0 0 0',
  },
}));
