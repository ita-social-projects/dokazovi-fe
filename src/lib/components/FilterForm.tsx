import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import _ from 'lodash';
import { Grid, Typography } from '@material-ui/core';
import { FilterPropertiesType } from '../types';

export interface ICheckboxes {
  [key: string]: boolean;
}

export interface IObjForAction {
  value: ICheckboxes;
}

export type FilterTiltleType = 'Регіони:' | 'Напрямки:';

export interface IFilterFormProps {
  filterProperties: FilterPropertiesType[];
  filterTitle: FilterTiltleType;
  checkedNamesString: () => string;
  allChecked: boolean;
  checked: ICheckboxes;
  onCheckboxAllChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckboxChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    typeName: string,
  ) => void;
}

export const FilterForm: React.FC<IFilterFormProps> = (props) => {
  const {
    filterProperties,
    filterTitle,
    checkedNamesString,
    allChecked,
    checked,
    onCheckboxAllChange,
    onCheckboxChange,
  } = props;

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
                      onChange={onCheckboxAllChange}
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
                        onChange={(event) => onCheckboxChange(event, type.name)}
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
