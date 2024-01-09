import React from 'react';
import { useHistory } from 'react-router-dom';
import { PersonalInfo } from './PersonalInfo/PersonalInfo';

const CreateAuthor = () => {
  const history = useHistory();
  return (
    <PersonalInfo onSaveSuccessful={(id) => history.push(`/experts/${id}`)} />
  );
};

export default CreateAuthor;
