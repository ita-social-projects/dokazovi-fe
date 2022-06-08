/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useCallback, SyntheticEvent, ChangeEvent } from 'react';
import { cloneDeep } from 'lodash'
import { useSelector } from 'react-redux';
import { Avatar, Container, Grid,  TextField, InputLabel,  IconButton } from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons//PhotoCamera';
import { Autocomplete } from '@material-ui/lab';
import { selectAuthorities } from '../../../models/authorities';
// import { BasicInput } from '../../../components/Form';
import { useStyles } from './styles/PersonalInfo.styles';
import { IExpert } from '../../../old/lib/types';
import { IAdminLabExpert, IExpertRegion, ICity } from '../../../models/adminLab/types';
import {BasicButton} from '../../../components/Form';

interface IProfileInfoProps {
  expert: IExpert;
}



const testExpert: IAdminLabExpert = 
  {
    id: 10,
    firstName: 'Марія',
    lastName: 'Марієнко',
    region: {
      name: 'Київська область',
      id: 2,
    },
    city: { 
      id: 3,
      name: "Київ",
    },
    dateOfCreation: '12.03.2022',
    email: 'somemail@gmail.com',
    socialNetwork: {
      facebook: 'www.facebook.com',
      instagram: 'www.instagram.com',
      youtube: 'www.youtube.com',
      twitter: 'www.twitter.com',
      linkedin: 'www.linkedin.com',
    },
    dateOfEdition: '12.03.2022',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    mainInstitution: {
      id: 5,
      city: {
        id: 55,
        name: 'Бровари',
      },
      name: 'Medical Idea',
    },
  };
  
  const mockRegions = [
      { 
        name: 'Київська область',
        id:2,
      },
      { 
        name:'Львівська' ,
        id:1,
      },
      { 
        name: 'Одеська',
        id:3,
      }, 
    ];

    const mockCities: ICity[] = [
      { 
        name: 'Київ',
        id: 3,
      },
      { 
        name:'Львів' ,
        id:1,
      },
      { 
        name: 'Одеса',
        id:2,
      }, 
    ];

export const PersonalInfo: React.FC<IProfileInfoProps> = ({ expert }) => {
    const classes = useStyles();
    const [expertInfo, setExpertInfo] = useState<IAdminLabExpert>(testExpert);
    // const [expertInfo, setExpertInfo] = useState<IExpert>();
    const authorities = useSelector(selectAuthorities);
    const isAdmin = authorities.data?.includes('SET_IMPORTANCE');

    const inputChangeHandler = (event: SyntheticEvent | any, inputIdetifier: string, value?: IExpertRegion | null) => {
        const updatedExpert: IAdminLabExpert = cloneDeep(expertInfo);
        console.log(event, value);
        updatedExpert[inputIdetifier] = value || event.target?.value as unknown;
        setExpertInfo(updatedExpert);
    };

    const inputProps =  {
        variant: 'outlined' as 'outlined',
        fullWidth: true,
        disabled: !{ isAdmin },
    };

    return (
        <form>
            <Grid container  spacing={6} className={classes.PersonalInfo} justifyContent="flex-end">

                    <Grid item xs={4}  >
                      <Container className={classes.AvatarContainer}>
                        <Avatar alt='Pic' 
                          className={classes.Avatar}
                          src= {expertInfo?.avatar}
                        /> 
                        <input accept ="image/*"  id="file-input" type="file" className={classes.Icon} style={{display: 'none'}} />
                        <label htmlFor="file-input>">
                          
                          <IconButton color="secondary" aria-label="upload picture" component="span" className={classes.Icon}>
                            <PhotoCameraIcon />
                          </IconButton>
                        </label>
                        
                      </Container>
                    </Grid>
                      <Grid item  xs={4}>
                        <TextField 
                        // eslint-disable-next-line react/jsx-props-no-spreading
                          {...inputProps}
                          label="Прізвище"
                          value={expertInfo?.lastName}
                          onChange={(event) => inputChangeHandler(event, 'lastName')}
                        />
                        <Autocomplete
                          onChange={(event, value) => inputChangeHandler(event, 'region', value)}
                          options={mockRegions}
                          getOptionLabel= {(option: IExpertRegion)=> option.name ?? option}
                          value={mockRegions.find(region => region.id === expertInfo.region?.id)}
                          getOptionSelected={(option, value) => option === value}
                          disabled = { !isAdmin }
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          renderInput={ (params) => <TextField {...params} {...inputProps} label='Регіон' />}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                          label="Ім'я" 
                          {...inputProps}
                          value={expertInfo?.firstName}
                          onChange={(event) => inputChangeHandler(event, 'firstName')}
                        />
                        <Autocomplete
                          onChange={(event, value) => inputChangeHandler(event, 'city', value)}
                          options={mockCities}
                          getOptionLabel= {(option: ICity)=> option.name ?? option}
                          value={mockCities.find(city => city.id === expertInfo.city?.id)}
                          getOptionSelected={(option, value) => option === value}
                          disabled = { !isAdmin }
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          renderInput={ (params) => <TextField {...params} {...inputProps} label='Регіон' />}
                        />
                    </Grid>


                    <Grid item  xs={4} className={classes.Contacts}>
                        <InputLabel>Посилання на персогальні сторінки</InputLabel>
                        <TextField
                          {...inputProps}
                          placeholder="Єлектонна пошта"
                          value = {expertInfo?.email}
                          onChange={(event) => inputChangeHandler(event, 'email')}
                        />
                        <TextField
                          {...inputProps}
                          placeholder="https://www.facebook.com"
                          value = {expertInfo.socialNetwork?.facebook}
                          onChange={(event) => inputChangeHandler(event, 'socialNetwork')}
                        />
                        <TextField
                        {...inputProps}
                          value = {expertInfo.socialNetwork?.instagram}
                          onChange={(event) => inputChangeHandler(event, 'socialNetwork')}
                          placeholder="https://www.instagram.com"
                        />
                        <TextField
                        {...inputProps}
                          value = {expertInfo.socialNetwork?.youtube}
                          onChange={(event) => inputChangeHandler(event, 'socialNetwork')}
                          placeholder="https://www.youtube.com"
                        />
                        <TextField
                          {...inputProps}
                          placeholder="https://www.twitter.com"
                        />
                        <TextField
                          {...inputProps}
                          placeholder="https://www.linkedin.com"
                        />
                    </Grid>
                    <Grid item xs = {8}>
                        <InputLabel>Основне місце роботи</InputLabel>
                        <TextField
                          rows = {2}
                          multiline
                          variant="outlined"
                          fullWidth
                          value={expertInfo?.mainInstitution?.name}
                          // onChange={(event) => inputChangeHandler(event, 'mainInstitution')}
                        />
                        <InputLabel>Біографія</InputLabel>
                        <TextField
                          variant="outlined"
                          rows = {8}
                          multiline
                          fullWidth
                          value={expertInfo?.bio}
                          onChange={(event) => inputChangeHandler(event, 'bio')}
                        />
                    </Grid>
                    <Grid item justifyContent="flex-end">
                      <BasicButton label = "Підтвердити зміни" type='sign'/>
                        
                    </Grid>
            </Grid>
        </form>
    );
};

export default PersonalInfo;
