import React, { useCallback, useEffect } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import type { RootStateType } from '../../store/rootReducer';
import { ExpertRegionType } from '../types';
import { setExpertsRegionsFilter } from '../../modules/experts/store/expertsSlice';

export interface ICheckboxes {
  [key: string]: boolean;
}

export interface IFilterFormProps {}

export const FilterForm: React.FC<IFilterFormProps> = () => {
  const dispatch = useDispatch();
  const regions = useSelector(
    (state: RootStateType) => state.properties?.regions,
  );

  const initLocalState = regions.reduce(
    (acc: ICheckboxes, next: ExpertRegionType) => {
      return { ...acc, [next.id.toString()]: true };
    },
    {},
  );

  const [checked, setChecked] = React.useState<ICheckboxes>(initLocalState);
  const [allChecked, setAllChecked] = React.useState<boolean>(true);

  useEffect(() => {
    return () => {
      dispatch(
        setExpertsRegionsFilter({
          value: {},
        }),
      );
    };
  }, []);

  const setExpertsFilter = useCallback(
    _.debounce((checkedTypes) => {
      dispatch(
        setExpertsRegionsFilter({
          value: checkedTypes as ICheckboxes,
        }),
      );
    }, 500),
    [],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedTypes = {
      ...checked,
      [event.target.id]: event.target.checked,
    };

    setChecked(checkedTypes);
    setExpertsFilter(checkedTypes);
  };

  const handleChangeAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedTypes = event.target.checked
      ? _.mapValues(checked, () => true)
      : _.mapValues(checked, () => false);

    setChecked(checkedTypes);
    setAllChecked(event.target.checked);
    setExpertsFilter(checkedTypes);
  };

  return (
    <>
      <Grid container style={{ paddingLeft: '30px', marginTop: '20px' }}>
        <Grid item xs={1}>
          <Typography variant="h5">Регіони:</Typography>
        </Grid>
        <Grid item xs={11}>
          <FormControlLabel
            style={{ width: '100%' }}
            control={
              <Checkbox
                id="All"
                checked={allChecked}
                onChange={handleChangeAll}
                name="All"
              />
            }
            label="Всі"
            key="All"
          />
        </Grid>
        <Grid item xs={1} />
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
        </FormGroup>{' '}
      </Grid>
    </>
  );
};
