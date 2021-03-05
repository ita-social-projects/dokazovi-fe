import { Checkbox, FormControlLabel } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

interface IFilter {
  id: string | number;
  name: string;
}

export interface ICheckBoxFilterFormProps {
  onFormChange: (checked: ICheckBoxFormState) => void;
  possibleFilters: IFilter[];
  selectedFilters?: IFilter[];
}

export interface ICheckBoxFormState extends Record<string, boolean> {}

const CheckBoxFilterForm: React.FC<ICheckBoxFilterFormProps> = ({
  onFormChange,
  possibleFilters,
  selectedFilters,
}) => {
  const getCheckedStateFromFilters = (): ICheckBoxFormState => {
    return possibleFilters.reduce((acc, next) => {
      acc[next.id] = Boolean(
        selectedFilters?.find((filter) => filter.id === next.id),
      );
      return acc;
    }, {} as ICheckBoxFormState);
  };
  const [checked, setChecked] = useState<ICheckBoxFormState>(
    getCheckedStateFromFilters(),
  );

  useEffect(() => {
    setChecked(getCheckedStateFromFilters());
  }, [selectedFilters]);

  const onCheckboxCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFormChange({
      ...checked,
      [event.target.name]: event.target.checked,
    });
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
      <form>{checkBoxes}</form>
    </>
  );
};

export default CheckBoxFilterForm;