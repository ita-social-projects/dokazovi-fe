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
import { useTranslation } from 'react-i18next';
import ChipsList from '../Chips/ChipsList';
import { CheckboxFormStateType } from './CheckboxFilterForm';
import { langTokens } from '../../../../locales/localizationInit';

interface IFilter {
  id: string | number;
  name: string;
}

export interface ICheckboxDropdownFilterFormProps {
  onFormChange: (checked: CheckboxFormStateType) => void;
  possibleFilters: IFilter[];
  selectedFilters?: IFilter[];
  filterTitle: string;
  noAll?: boolean;
  maximumReached?: boolean;
}

export const CheckboxDropdownFilterForm: React.FC<ICheckboxDropdownFilterFormProps> = ({
  onFormChange,
  possibleFilters,
  selectedFilters,
  filterTitle,
  noAll,
  maximumReached,
}) => {
  const { t } = useTranslation();
  const isInitialStateEmpty = isEmpty(selectedFilters) && !noAll;

  const getCheckedStateFromFilters = (): CheckboxFormStateType => {
    return possibleFilters.reduce((acc, next) => {
      acc[next.id] =
        isInitialStateEmpty ||
        Boolean(selectedFilters?.find((filter) => filter.id === next.id));
      return acc;
    }, {});
  };

  const [allChecked, setAllChecked] = useState(isInitialStateEmpty);
  const [checked, setChecked] = useState<CheckboxFormStateType>(
    getCheckedStateFromFilters(),
  );

  useEffect(() => {
    if (
      selectedFilters === undefined ||
      selectedFilters?.length === possibleFilters.length
    ) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
    setChecked(getCheckedStateFromFilters());
  }, [selectedFilters]);

  const onCheckboxCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked && allChecked) {
      setAllChecked(false);
    }

    onFormChange({
      ...checked,
      [event.target.name]: event.target.checked,
    });
  };

  const onCheckboxAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedFilters = event.target.checked
      ? mapValues(checked, () => true)
      : mapValues(checked, () => false);

    setAllChecked(event.target.checked);
    setChecked(checkedFilters);
    onFormChange(checkedFilters);
  };

  const getNames = () => {
    if (allChecked && noAll) {
      return '';
    }
    if (allChecked) {
      return t(langTokens.common.all);
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

  const checkBoxes = possibleFilters.map((filter) => {
    const id = filter.id.toString();
    return (
      <FormControlLabel
        key={id}
        label={
          <ChipsList
            checkedNames={filter.name}
            isLabelItem
            max={!checked[id] && maximumReached}
          />
        }
        control={
          <Checkbox
            checked={checked[id]}
            onChange={(event) => onCheckboxCheck(event)}
            name={id}
            disabled={!checked[id] && maximumReached}
            color="primary"
          />
        }
      />
    );
  });

  return (
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
            {!noAll && (
              <>
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
                    label={t(langTokens.common.all)}
                    key="All"
                  />
                </Grid>
                <Grid item xs={2} style={{ marginRight: '-30px' }} />
              </>
            )}
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
  );
};
