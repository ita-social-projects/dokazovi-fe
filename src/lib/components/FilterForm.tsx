import React, { useCallback } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography } from '@material-ui/core';
import type { RootStateType } from '../../store/rootReducer';
import { ExpertRegionType } from '../types';
import { setExpertsRegionsFilter } from '../../modules/experts/store/expertsSlice';
import { useStyles } from '../../modules/experts/styles/ExpertsView.styles';

export type CheckedType = {
  [key: string]: boolean;
};

export interface IInitLocalState {
  [key: string]: boolean;
}

export interface ICheckboxes {
  [key: number]: boolean;
}

export interface IFilterFormProps {}

export const FilterForm: React.FC<IFilterFormProps> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const regions = useSelector(
    (state: RootStateType) => state.properties?.regions,
  );
  const { filters } = useSelector(
    (state: RootStateType) => state.experts?.experts,
  );

  const initLocalState = () =>
    regions.reduce((acc: IInitLocalState, next: ExpertRegionType) => {
      return { ...acc, [next.id.toString()]: false };
    }, {});

  const [checked, setChecked] = React.useState<IInitLocalState>(initLocalState);

  const expertsFilters = filters?.REGIONS?.value as ICheckboxes;

  const handler = useCallback(
    _.debounce((checkedTypes: ICheckboxes) => {
      dispatch(
        setExpertsRegionsFilter({
          value: checkedTypes,
        }),
      );
    }, 500),
    [],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedTypes = {
      ...initLocalState,
      ...checked,
      [event.target.id]: event.target.checked,
    };

    setChecked(checkedTypes);
    handler(checkedTypes);

    console.log(checkedTypes);
    console.log('event.target.id: ', event.target.id);
  };

  const handleChangeAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedTypes = event.target.checked
      ? _.mapValues(checked, () => true)
      : _.mapValues(checked, () => false);

    setChecked(checkedTypes);
    handler(checkedTypes);

    console.log(checkedTypes);
    console.log('event.target.id: ', event.target.id);
  };

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={1}>
          <Typography variant="h5">Регіони:</Typography>
        </Grid>
        <FormControlLabel
          style={{ width: '100%' }}
          control={
            <Checkbox
              id="All"
              checked={checked.id}
              onChange={handleChangeAll}
              name="All"
            />
          }
          label="All"
          key="All"
        />

        <FormGroup
          style={{
            height: '450px',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
          }}
        >
          {regions.map((type) => (
            <FormControlLabel
              style={{ width: '100%' }}
              control={
                <Checkbox
                  id={type.id.toString()}
                  checked={checked[type.id.toString()]}
                  onChange={handleChange}
                  name={type.name}
                />
              }
              label={type.name}
              key={type.name}
            />
          ))}
        </FormGroup>
      </Grid>
    </>
  );
};
