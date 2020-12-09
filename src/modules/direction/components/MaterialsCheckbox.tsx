import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useForm, Controller } from 'react-hook-form';
import Checkbox from '@material-ui/core/Checkbox';

export interface ICheckboxMaterials {
  handleBoxChange(event: React.ChangeEvent<HTMLInputElement>):void;
  checkedBoxes: {
    '1' : boolean;
    '2' : boolean;
    '3' : boolean;
  };
}

export const CheckboxMaterials: React.FC<ICheckboxMaterials> = ({
  handleBoxChange,
  checkedBoxes,
}) => {
  const { control } = useForm();
  return (
    <form>
      <FormControlLabel
        control={
          <Controller
            as={Checkbox}
            control={control}
            onClick={(event) => handleBoxChange(event)}
            name="checkedArticle"
            color="primary"
            id="1"
            checked={checkedBoxes[1]}
            defaultValue={false}
          />
        }
        label="Статті"
      />
      <FormControlLabel
        control={
          <Controller
            as={Checkbox}
            control={control}
            onClick={(event) => handleBoxChange(event)}
            name="checkedDopys"
            color="primary"
            id="2"
            checked={checkedBoxes[2]}
            defaultValue={false}
          />
        }
        label="Дописи"
      />
      <FormControlLabel
        control={
          <Controller
            as={Checkbox}
            control={control}
            onClick={(event) => handleBoxChange(event)}
            name="checkedVideo"
            color="primary"
            id="3"
            checked={checkedBoxes[3]}
            defaultValue={false}
          />
        }
        label="Відео"
      />
    </form>
  );
};
