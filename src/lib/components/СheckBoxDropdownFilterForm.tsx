import React, { useEffect, useState } from 'react';
import { isEmpty, mapValues } from 'lodash';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChipsList from './ChipsList';
import { ICheckBoxFormState } from './CheckBoxFilterForm';
import { FilterTypeEnum } from '../types';

interface IFilter {
  id: string | number;
  name: string;
}

export interface ICheckBoxDropdownFilterFormProps {
  onFormChange: (checked: ICheckBoxFormState, filterType?) => void;
  possibleFilters: IFilter[];
  selectedFilters?: IFilter[];
  filterTitle: string;
  filterType?: FilterTypeEnum;
}

const CheckBoxDropdownFilterForm: React.FC<ICheckBoxDropdownFilterFormProps> = ({
  onFormChange,
  possibleFilters,
  selectedFilters,
  filterTitle,
  filterType,
}) => {
  const isInitialStateEmpty = isEmpty(selectedFilters);

  const getCheckedStateFromFilters = (): ICheckBoxFormState => {
    return possibleFilters.reduce((acc, next) => {
      acc[next.id] =
        allChecked ||
        Boolean(selectedFilters?.find((filter) => filter.id === next.id));
      return acc;
    }, {} as ICheckBoxFormState);
  };

  const [allChecked, setAllChecked] = useState(isInitialStateEmpty);
  const [checked, setChecked] = useState<ICheckBoxFormState>(
    getCheckedStateFromFilters(),
  );

  useEffect(() => {
    setChecked(getCheckedStateFromFilters());
  }, [selectedFilters]);

  useEffect(() => {
    if (Object.values(checked).every((elem) => elem)) {
      setAllChecked(true);
    }
  }, [checked]);

  const onCheckboxCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked && allChecked) {
      setAllChecked(false);
    }

    onFormChange(
      {
        ...checked,
        [event.target.name]: event.target.checked,
      },
      filterType,
    );
  };

  const onCheckboxAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedFilters = event.target.checked
      ? mapValues(checked, () => true)
      : mapValues(checked, () => false);

    setAllChecked(event.target.checked);
    setChecked(checkedFilters);
    onFormChange(checkedFilters, filterType);
  };

  const getNames = () => {
    if (allChecked) {
      return 'Всі';
    }
    if (selectedFilters) {
      const names = selectedFilters?.reduce((acc, filter) => {
        acc.push(filter.name);
        return acc;
      }, [] as string[]);
      if (names?.length < 4) {
        return names.join(', ');
      }
      return `${names?.slice(0, 3).join(', ')} + ${names?.length - 3}`;
    }
    return possibleFilters
      .reduce((acc, filter) => {
        acc.push(filter.name);
        return acc;
      }, [] as string[])
      .join(', ');
  };

  const checkBoxes = possibleFilters?.map((filter) => {
    const id = filter.id.toString();
    return (
      <FormControlLabel
        key={id}
        label={filter.name}
        control={
          <Checkbox
            checked={checked[id]}
            onChange={(event) => onCheckboxCheck(event)}
            name={id}
            color="primary"
          />
        }
      />
    );
  });

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
                <ChipsList checkedNames={getNames()} />
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
                {checkBoxes}
              </FormGroup>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default CheckBoxDropdownFilterForm;
