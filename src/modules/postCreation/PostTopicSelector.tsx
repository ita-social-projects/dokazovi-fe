import React, { useState } from 'react';
import _ from 'lodash';
import { Grid } from '@material-ui/core';
import { FilterForm } from '../../lib/components/FilterForm';
import { FilterPropertiesType, ICheckboxes, IDirection } from '../../lib/types';

export interface IArticleTopics {
  dispatchTopics: (action: string[]) => void;
  topicList: IDirection[];
  prevCheckedTopicsIds?: string[];
}

export const PostTopicSelector: React.FC<IArticleTopics> = ({
  dispatchTopics,
  topicList,
  prevCheckedTopicsIds,
}) => {
  const initialCheckboxState = topicList.reduce(
    (acc: ICheckboxes, next: FilterPropertiesType) => {
      const id = next.id.toString();
      return { ...acc, [id]: prevCheckedTopicsIds?.includes(id) || false };
    },
    {},
  );

  const [checkedTopics, setCheckedTopics] = useState<ICheckboxes>(
    initialCheckboxState,
  );
  const [isMax, setIsMax] = useState(
    _.keys(_.pickBy(prevCheckedTopicsIds)).length === 3 || false,
  );
  const [error, setError] = useState('');

  const prevCheckedTopicNames =
    prevCheckedTopicsIds &&
    topicList
      .filter((topic) => prevCheckedTopicsIds.includes(String(topic.id)))
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

    const newCheckedTopicsIds = _.keys(_.pickBy(newCheckedTopics));

    const newDisplayedTopicNames = event.target.checked
      ? [...displayedTopicNames, topicName]
      : displayedTopicNames.filter((name) => name !== topicName);

    if (newDisplayedTopicNames.length === 3) {
      setIsMax(true);
    } else setIsMax(false);
    if (newDisplayedTopicNames.length < 1) {
      setError('Виберіть принаймні одну тему');
    } else setError('');

    setCheckedTopics(newCheckedTopics);
    setDisplayedTopicNames(newDisplayedTopicNames);
    dispatchTopics(newCheckedTopicsIds);
  };

  const getDisplayedTopics = () => displayedTopicNames.join(', ');

  return (
    <Grid container direction="column">
      <FilterForm
        filterProperties={topicList}
        filterTitle="Напрямки:"
        checkedNamesString={getDisplayedTopics}
        checked={checkedTopics}
        max={isMax}
        error={error}
        onCheckboxChange={handleChange}
      />
    </Grid>
  );
};
