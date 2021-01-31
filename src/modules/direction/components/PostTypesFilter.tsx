import React, { useState, useCallback } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useForm, Controller } from 'react-hook-form';
import Checkbox from '@material-ui/core/Checkbox';
import { RootStateType } from '../../../store/rootReducer';
import { IPostType } from '../../../lib/types';
import useEffectExceptOnMount from '../../../lib/hooks/useEffectExceptOnMount';

export interface IPostTypeFilterProps {
  setFilters(checked?: string[]): void;
  selectedTypes?: string[];
}

export const PostTypeFilter: React.FC<IPostTypeFilterProps> = ({
  setFilters,
  selectedTypes,
}) => {
  const { control } = useForm();

  const postTypes = useSelector(
    (state: RootStateType) => state.properties.postTypes,
  );

  interface IInitState {
    [key: string]: boolean;
  }

  const initState = () =>
    postTypes.reduce((acc: IInitState, next: IPostType) => {
      const id = next.id.toString();
      return { ...acc, [id]: selectedTypes?.includes(id) || false };
    }, {});

  // triggers fetch when user navigates history. skip call on component mount to
  // avoid unnecessary history push. also, update checkboxes state using a query
  // from props. use a string instead of string array in deps, since array is
  // always going to be a different object and that would cause an infinite loop.
  const selectedTypesString = selectedTypes?.join();
  useEffectExceptOnMount(() => {
    console.log('effect called with types', selectedTypes);

    setChecked(initState());
    setFilters(selectedTypes);
  }, [selectedTypesString]);

  // no need to keep the state in a component, since it's persisted in url
  // how to debounce calls without local state tho?
  const [checkedTypes, setChecked] = useState(initState);

  const checkBoxes = postTypes?.map((type) => {
    const id = type.id.toString();
    // console.log(`query has typeId #${id}`, selectedTypes?.includes(id));
    return (
      <FormControlLabel
        key={type.id}
        control={
          <Controller
            as={Checkbox}
            control={control}
            onClick={(event) => handleClick(event)}
            name={type.name}
            id={id}
            color="primary"
            checked={checkedTypes[id] || false}
            defaultValue={false}
          />
        }
        label={type.name}
      />
    );
  });

  const handler = useCallback(
    _.debounce((checked: string[]) => setFilters(checked), 500),
    [],
  );

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedType = {
      ...checkedTypes,
      [event.target.id]: event.target.checked,
    };
    setChecked(checkedType);

    const checked = Object.keys(checkedType).filter((key) => {
      return checkedType[key] === true;
    });
    handler(checked);
  };

  return <form>{checkBoxes}</form>;
};
