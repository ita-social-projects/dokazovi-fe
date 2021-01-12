import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { FilterForm } from '../../lib/components/FilterForm';
import { FilterPropertiesType } from '../../lib/types';

export interface ICheckboxes {
  [key: string]: boolean;
}

export interface IArticleTopics {
  setTopics: (action: { value: ICheckboxes }) => void;
  topics: FilterPropertiesType[];
}

export const PostTopicSelector: React.FC<IArticleTopics> = (props) => {
  const { setTopics, topics } = props;
  const dispatch = useDispatch();

  const initLocalState = topics.reduce(
    (acc: ICheckboxes, next: FilterPropertiesType) => {
      return { ...acc, [next.id.toString()]: false };
    },
    {},
  );

  const [checked, setChecked] = useState<ICheckboxes>(initLocalState);
  const [error, setError] = useState('');
  const [displayedTopicNames, setDisplayedTopicNames] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      dispatch(
        setTopics({
          value: {},
        }),
      );
    };
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    typeName: string,
  ) => {
    const checkedTopics = {
      ...checked,
      [event.target.id]: event.target.checked,
    };

    const newDisplayedTopicNames = event.target.checked
      ? [...displayedTopicNames, typeName]
      : displayedTopicNames.filter((name) => name !== typeName);

    setError('');
    if (newDisplayedTopicNames.length > 3) {
      setError('Виберіть не більше трьох тем');
      return;
    }
    if (newDisplayedTopicNames.length < 1) {
      setError('Виберіть принаймні одну тему');
    }

    setChecked(checkedTopics);
    setDisplayedTopicNames(newDisplayedTopicNames);
    dispatch(
      setTopics({
        value: checkedTopics,
      }),
    );
  };

  const getDisplayedTopics = () => displayedTopicNames.join(', ');

  return (
    <FilterForm
      filterProperties={topics}
      filterTitle="Напрямки:"
      checkedNamesString={getDisplayedTopics}
      checked={checked}
      error={error}
      onCheckboxChange={handleChange}
    />
  );
};
