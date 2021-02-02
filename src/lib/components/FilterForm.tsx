import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Typography,
  Box,
} from '@material-ui/core';
import { FilterPropertiesType, ICheckboxes } from '../types';
import ChipsList from './ChipsList';

export interface IObjForAction {
  value: ICheckboxes;
}

export type FilterTiltleType = 'Регіони:' | 'Напрямки:';

export interface IFilterFormProps {
  filterProperties: FilterPropertiesType[];
  filterTitle: FilterTiltleType;
  checkedNamesString: () => string;
  allChecked?: boolean;
  checked: ICheckboxes;
  max?: boolean;
  error?: string;
  onCheckboxAllChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
    max,
    error,
    onCheckboxAllChange,
    onCheckboxChange,
  } = props;

  return (
    <>
      <Box mt={2}>
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
                {error || <ChipsList checkedNames={checkedNamesString()} />}
              </Grid>
            </Grid>
          </AccordionSummary>

          <AccordionDetails>
            <Grid container>
              <Grid item xs={2} style={{ marginRight: '-30px' }} />
              <Grid item xs={10}>
                {allChecked !== undefined && (
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
                )}
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
                        disabled={!checked[type.id.toString()] && max}
                        onChange={(event) => onCheckboxChange(event, type.name)}
                        name={type.name}
                      />
                    }
                    label={
                      <ChipsList
                        checkedNames={type.name}
                        isLabelItem
                        max={max}
                      />
                    }
                    key={type.name}
                  />
                ))}
              </FormGroup>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};
