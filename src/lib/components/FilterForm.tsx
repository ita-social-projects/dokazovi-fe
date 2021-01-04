import React, { useCallback, useEffect } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';

import { ExpertPropertiesType, FilterTypeEnum, IPostType } from '../types';

export interface ICheckboxes {
  [key: string]: boolean;
}

export interface IObjForAction {
  value: ICheckboxes;
}

export interface IFilterFormProps {
  setFilter: (obj: IObjForAction) => void;
  filterProperties: IPostType[];
  filterType: FilterTypeEnum;
}

export const FilterForm: React.FC<IFilterFormProps> = (props) => {
  const { setFilter, filterProperties, filterType } = props;
  const dispatch = useDispatch();

  const initLocalState = filterProperties.reduce(
    (acc: ICheckboxes, next: ExpertPropertiesType) => {
      return { ...acc, [next.id.toString()]: true };
    },
    {},
  );

  const initNamesState = filterProperties.map((type) => type.name);

  const [checked, setChecked] = React.useState<ICheckboxes>(initLocalState);
  const [allChecked, setAllChecked] = React.useState<boolean>(true);
  const [checkedNames, setCheckedNames] = React.useState<string[]>(
    initNamesState,
  );

  const filterTitle =
    filterType === FilterTypeEnum.REGIONS ? 'Регіони:' : 'Напрямки:';

  useEffect(() => {
    return () => {
      dispatch(
        setFilter({
          value: {},
        }),
      );
    };
  }, []);

  useEffect(() => {
    if (Object.values(checked).every((elem) => elem)) {
      setAllChecked(true);
    }
  }, [checked]);

  const setFilterWithDebounce = useCallback(
    _.debounce((checkedTypes: ICheckboxes) => {
      dispatch(
        setFilter({
          value: checkedTypes,
        }),
      );
    }, 500),
    [],
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    typeName: string,
  ) => {
    const checkedTypes = {
      ...checked,
      [event.target.id]: event.target.checked,
    };

    if (!event.target.checked && allChecked) {
      setAllChecked(false);
    }

    const newCheckedNames = event.target.checked
      ? [...checkedNames, typeName]
      : checkedNames.filter((name) => name !== typeName);

    setChecked(checkedTypes);
    setCheckedNames(newCheckedNames);
    setFilterWithDebounce(checkedTypes);
  };

  const handleChangeAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedTypes = event.target.checked
      ? _.mapValues(checked, () => true)
      : _.mapValues(checked, () => false);

    const newCheckedNames = event.target.checked
      ? filterProperties.map((type) => type.name)
      : [];

    setChecked(checkedTypes);
    setAllChecked(event.target.checked);
    setCheckedNames(newCheckedNames);
    setFilterWithDebounce(checkedTypes);
  };

  const checkedNamesString = () => {
    if (allChecked) {
      return 'Всі';
    }
    if (checkedNames.length < 4) {
      return checkedNames.join(', ');
    }
    return `${checkedNames.slice(0, 3).join(', ')} + ${
      checkedNames.length - 3
    }`;
  };

  return (
    <>
      <div style={{ width: '100%', paddingLeft: '30px', marginTop: '20px' }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Grid container>
              <Grid item xs={2} style={{ marginRight: '-30px' }}>
                <Typography variant="h5">{filterTitle}</Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography>{checkedNamesString()}</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>

          <AccordionDetails>
            <Grid container>
              <Grid item xs={2} style={{ marginRight: '-30px' }} />
              <Grid item xs={10}>
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
              <Grid item xs={2} style={{ marginRight: '-30px' }} />
              <FormGroup
                style={{
                  height: '450px',
                  display: 'flex',
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                }}
              >
                {filterProperties.map((type) => (
                  <FormControlLabel
                    style={{ width: '100%' }}
                    control={
                      <Checkbox
                        id={type.id.toString()}
                        checked={checked[type.id.toString()]}
                        onChange={(event) => handleChange(event, type.name)}
                        name={type.name}
                      />
                    }
                    label={type.name}
                    key={type.name}
                  />
                ))}
              </FormGroup>{' '}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};
