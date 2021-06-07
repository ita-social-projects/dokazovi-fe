import React from 'react';
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
      <ExpertMaterialsContainer expertId={expert.id} expert={expert} />
    </>
  );
};

export default ExpertProfileView;
