import React, { useState } from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { FilterForm } from '../../lib/components/FilterForm';
import { FilterPropertiesType } from '../../lib/types';

export interface ICheckboxes {
  [key: string]: boolean;
}

export interface IArticleTopics {
  setTopics: (action: ICheckboxes) => void;
  topicList: FilterPropertiesType[];
  prevCheckedTopics?: ICheckboxes;
}

export const PostTopicSelector: React.FC<IArticleTopics> = ({
  setTopics,
  topicList,
  prevCheckedTopics,
}) => {
  const dispatch = useDispatch();
  const initialCheckboxState = topicList.reduce(
    (acc: ICheckboxes, next: FilterPropertiesType) => {
      return { ...acc, [next.id.toString()]: false };
    },
    {},
  );

  const [checkedTopics, setCheckedTopics] = useState<ICheckboxes>(
    prevCheckedTopics || initialCheckboxState,
  );
  const [isMax, setIsMax] = useState(
    _.keys(_.pickBy(prevCheckedTopics)).length === 3 || false,
  );
  const [error, setError] = useState('');

  const prevCheckedTopicNames =
    prevCheckedTopics &&
    topicList
      .filter((topic) => {
        const truthyCheckboxIDs = _.keys(_.pickBy(prevCheckedTopics));
        return truthyCheckboxIDs.includes(String(topic.id));
      })
      .map((topic) => topic.name);

  const [displayedTopicNames, setDisplayedTopicNames] = useState<string[]>(
    prevCheckedTopicNames || [],
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    topicName: string,
  ) => {
    const newCheckedTopics = {
      ...checkedTopics,
      [event.target.id]: event.target.checked,
    };

    const newDisplayedTopicNames = event.target.checked
      ? [...displayedTopicNames, topicName]
      : displayedTopicNames.filter((name) => name !== topicName);

    setError('');
    setIsMax(false);
    if (newDisplayedTopicNames.length === 3) {
      setIsMax(true);
    }
    if (newDisplayedTopicNames.length < 1) {
      setError('Виберіть принаймні одну тему');
    }

    setCheckedTopics(newCheckedTopics);
    setDisplayedTopicNames(newDisplayedTopicNames);
    dispatch(setTopics(newCheckedTopics));
  };

  const getDisplayedTopics = () => displayedTopicNames.join(', ');

  return (
    <FilterForm
      filterProperties={topicList}
      filterTitle="Напрямки:"
      checkedNamesString={getDisplayedTopics}
      checked={checkedTopics}
      max={isMax}
      error={error}
      onCheckboxChange={handleChange}
    />
  );
};
