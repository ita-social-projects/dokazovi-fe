import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Avatar, Container, Grid, Select, TextField, InputLabel} from '@material-ui/core';
import { BasicInput } from '../../../components/Form';
import { useStyles } from './styles/PersonalInfo.styles';
import { IExpert } from '../../../old/lib/types';
// import { getExpertById } from '../../../old/lib/utilities/API/api';
import { getCurrentUser } from '../../../old/lib/utilities/API/api';
import { ERROR_404 } from '../../../old/lib/constants/routes';

export const PersonalInfo: React.FC = () => {
    const classes = useStyles();
    const { expertId } = useParams<{ expertId: string }>();
    const [loadedExpert, setLoadedExpert] = useState<IExpert>();
    const [statusCode, setStatusCode] = useState<number>();
    const history = useHistory();
    
    const fetchExpert = useCallback(async () => {
        try {
          const expertResponse = await getCurrentUser();
          setLoadedExpert(expertResponse.data);
          console.log(loadedExpert, 'expert');
        } catch (error) {
          setStatusCode(404);
        }
      }, [expertId]);

      useEffect(() => {
        fetchExpert();
      }, [fetchExpert]);

      if (statusCode === 404) {
        history.push(ERROR_404);
      }


    return (
        <form>
            <Grid container  spacing={6} className={classes.PersonalInfo}>

                    <Grid xs={4} >
                    <Avatar alt='Pic' 
                    src= {loadedExpert?.avatar}/>
                    </Grid>
                    <Grid item  xs={4}>
                        <BasicInput/>
                        <TextField
                        select 
                        // size="small"
                        variant="outlined"
                        // margin="normal"
                        fullWidth/>
                    </Grid>
                    <Grid item xs={4}>
                        <BasicInput label="Ім'я" inputRef={loadedExpert?.firstName}/>
                        <TextField
                        select 
                        size="medium"
                        variant="outlined"
                        // margin="dense"
                        fullWidth/>
                    </Grid>


                    <Grid item direction="column" xs={4} className={classes.Contacts}>
                        <InputLabel>Посилання на персогальні сторінки</InputLabel>
                        <BasicInput/>
                        <BasicInput/>
                        <BasicInput/>
                        <BasicInput/>
                        <BasicInput/>
                        <BasicInput/>
                    </Grid>
                    <Grid item xs = {8}>
                        <InputLabel>Основне мысце роботи</InputLabel>
                        <BasicInput/>
                        <InputLabel>Біографія</InputLabel>
                        <BasicInput/>
                    </Grid>

            </Grid>
           
        </form>
    );
};

export default PersonalInfo;
