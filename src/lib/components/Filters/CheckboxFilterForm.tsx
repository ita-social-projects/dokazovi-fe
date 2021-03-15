import { Checkbox, FormControlLabel } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

interface IFilter {
  id: string | number;
  name: string;
}

export interface ICheckboxFormState extends Record<string, boolean> {}

export interface ICheckboxFilterFormProps {
  onFormChange: (checked: ICheckboxFormState) => void;
  possibleFilters: IFilter[];
  selectedFilters?: IFilter[];
}

const CheckboxFilterForm: React.FC<ICheckboxFilterFormProps> = ({
  onFormChange,
  possibleFilters,
  selectedFilters,
}) => {
  const getCheckedStateFromFilters = (): ICheckboxFormState => {
    return possibleFilters.reduce((acc, next) => {
      acc[next.id] = Boolean(
        selectedFilters?.find((filter) => filter.id === next.id),
      );
      return acc;
    }, {} as ICheckboxFormState);
  };
  const [checked, setChecked] = useState<ICheckboxFormState>(
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

  return <form>{checkBoxes}</form>;
};

export default CheckboxFilterForm;
