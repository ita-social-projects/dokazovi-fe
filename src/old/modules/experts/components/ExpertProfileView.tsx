import React from 'react';
import { BorderBottom } from '../../../lib/components/Border';
import ExpertInfo from './ExpertInfo';
import ExpertMaterialsContainer from './ExpertMaterialsContainer';
import { IExpert } from '../../../lib/types';
import { PageTitle } from '../../../lib/components/Pages/PageTitle';

export interface IExpertProfileViewProps {
  expert: IExpert;
}

const ExpertProfileView: React.FC<IExpertProfileViewProps> = ({ expert }) => {
  return (
    <>
      <PageTitle title={`${expert.firstName} ${expert.lastName}`} />
      <ExpertInfo expert={expert} />
      <BorderBottom />
      <ExpertMaterialsContainer expertId={expert.id} />
    </>
  );
};

export default ExpertProfileView;
