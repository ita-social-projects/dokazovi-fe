import React from 'react';
import { PageTitle } from 'components/Page/PageTitle';
import ExpertMaterialsContainer from './ExpertMaterialsContainer';
import { IExpert } from '../../../lib/types';

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
