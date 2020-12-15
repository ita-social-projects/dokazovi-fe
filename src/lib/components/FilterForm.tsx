import React, { useCallback, useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import debounce from 'lodash.debounce';
import _ from 'lodash';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { StaticRouter } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { getRegions } from '../utilities/API/api';
import { GetRegionsType } from '../utilities/API/types';

// const GreenCheckbox = withStyles({
//   root: {
//     color: green[400],
//     '&$checked': {
//       color: green[600],
//     },
//   },
//   checked: {},
// })((props) => <Checkbox color="default" {...props} />);

export type CheckedType = {
  [key: string]: boolean;
};

export const FilterForm: React.FC = () => {
  // const {register, handleSubmit} = useForm();
  const [state, setState] = useState<GetRegionsType[]>();

  // const initialLocalState: GetRegionsType[] = [];
  // const regions = getRegions()
  const localState: GetRegionsType[] = [];

  console.log(state);

  const regions = ['Kyiv', 'Lviv', 'Kharkiv'];

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const checkboxName = event?.target?.name;
  //   setState({ ...state, [checkboxName]: event.target.checked });
  //   console.log(state);
  // };

  const stateLog = () => {
    console.log(state);
  };

  const handler = useCallback(_.debounce(stateLog, 2000), []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxName = event?.target?.name;
    setState({ ...state, [checkboxName]: event.target.checked });
    // console.log(state);
    handler();
  };

  return (
    <>
      <FormGroup row>
        {regions.map((elem, index) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={state ? state[elem] : false}
                onChange={handleChange}
                name={elem}
              />
            }
            label={elem}
            key={elem}
          />
        ))}
      </FormGroup>
    </>
  );
};
