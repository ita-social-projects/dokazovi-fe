import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import i18n from 'i18next';
import { useHistory } from 'react-router-dom';
import { langTokens } from '../../locales/localizationInit';
import { BasicButton } from '../../components/Form';
import { useStyles } from './CreateUserAccountPage.style';

const CreateUserAccountPageSuccess = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Container className={classes.SuccessContainer}>
      <Typography variant="h3" component="p" className={classes.successText}>
        {`${i18n.t(langTokens.passwordForms.createUserSuccess)}!`}
      </Typography>
      <Box className={classes.SuccessButtonBox}>
        <BasicButton
          type="accept"
          label={i18n.t(langTokens.passwordForms.goToHome)}
          onClick={() => history.push('/opendoctorgate')}
        />
      </Box>
    </Container>
  );
};

export default CreateUserAccountPageSuccess;
