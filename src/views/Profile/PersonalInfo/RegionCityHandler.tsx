import { Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import i18n, { langTokens } from 'locales/localizationInit';
import { RootStateType } from 'models/rootReducer';
import { IRegion, ICity } from 'old/lib/types';
import {
  getCitiesByRegionId,
  getRegionByCityId,
} from 'old/lib/utilities/API/api';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ErrorField } from './ErrorField';
import { useStyles } from './styles/PersonalInfo.styles';
import { IRegionCityHandlerProps } from './types';

const RegionCityHandler = ({
  newAuthorValues,
  errorFields,
  visitFields,
  setNewAuthorValues,
  setErrorFields,
  blurHandler,
}: IRegionCityHandlerProps): JSX.Element => {
  const classes = useStyles();

  const regions = useSelector(
    (state: RootStateType) => state.properties.regions,
  );
  const cities = useSelector((state: RootStateType) => state.properties.cities);
  const [selectRegions, setSelectRegions] = useState<IRegion[] | null>(null);
  const [regionForValue, setRegionForValue] = useState<IRegion | null>(null);
  const [selectCities, setSelectCities] = useState<ICity[] | null>();
  const [isCitySelect, setIsCitySelect] = useState<boolean>(false);

  const setRegionByCityId = async (id: number) => {
    const regionResponse = await getRegionByCityId(id).then((res) => {
      if (res.status === 200) {
        return res.data;
      }
      return false;
    });
    if (regionResponse) {
      setSelectRegions([regionResponse]);
      setRegionForValue(regionResponse);
    }
  };

  const setCitiesByRegionId = async (id: number) => {
    const citiesResponse = await getCitiesByRegionId(id).then((res) => {
      if (res.status === 200) {
        return res.data;
      }
      return false;
    });
    if (citiesResponse) {
      setSelectCities(citiesResponse);
    }
  };
  const inputCityChangeHandler = (
    _,
    value: ICity | null,
    inputIdentifier: string,
  ) => {
    if (!value) {
      setErrorFields({
        ...errorFields,
        [inputIdentifier]: i18n.t(langTokens.admin.fieldCantBeEmpty),
      });
      setIsCitySelect(false);
      setSelectRegions(null);
      if (!regionForValue) {
        setSelectCities(null);
      }
    } else {
      setErrorFields({ ...errorFields, [inputIdentifier]: '' });
      setNewAuthorValues({ ...newAuthorValues, [inputIdentifier]: value.id });
      setRegionByCityId(value.id);
      setIsCitySelect(true);
    }
  };

  const inputRegionChangeHandler = (
    _,
    value: string | '',
    inputIdentifier: string,
  ) => {
    if (!value) {
      setErrorFields({
        ...errorFields,
        [inputIdentifier]: i18n.t(langTokens.admin.fieldCantBeEmpty),
      });
      setRegionForValue(null);
      setSelectCities(null);
      if (!isCitySelect) {
        setSelectRegions(null);
      }
    } else {
      const regionFromValue = regions.find((region) => region.name === value);
      if (regionFromValue) {
        setErrorFields({ ...errorFields, [inputIdentifier]: '' });
        setNewAuthorValues({
          ...newAuthorValues,
          [inputIdentifier]: regionFromValue.id,
        });
        setCitiesByRegionId(regionFromValue.id);
        setRegionForValue(regionFromValue);
      }
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <ErrorField
          errorField={errorFields.regionId}
          visitField={visitFields.region}
        />
        <Autocomplete
          disablePortal
          options={selectRegions || regions}
          fullWidth
          value={regionForValue}
          getOptionLabel={(region: IRegion) => region.name}
          getOptionSelected={(option, value) => option.id === value.id}
          onInputChange={(_, value) =>
            inputRegionChangeHandler(_, value, 'regionId')
          }
          renderInput={(params) => (
            <TextField
              variant="outlined"
              className={classes.TextField}
              required
              // eslint-disable-next-line
              {...params}
              label={i18n.t(langTokens.admin.region)}
              name="region"
              onBlur={blurHandler}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <ErrorField
          errorField={errorFields.cityId}
          visitField={visitFields.city}
        />
        <Autocomplete
          disablePortal
          options={selectCities || cities}
          fullWidth
          getOptionLabel={(city: ICity) => city.name}
          getOptionSelected={(option, value) => option.id === value.id}
          onChange={(_, value) => inputCityChangeHandler(_, value, 'cityId')}
          renderInput={(params) => (
            <TextField
              variant="outlined"
              className={classes.TextField}
              required
              // eslint-disable-next-line
              {...params}
              label={i18n.t(langTokens.admin.city)}
              name="city"
              onBlur={blurHandler}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default RegionCityHandler;
