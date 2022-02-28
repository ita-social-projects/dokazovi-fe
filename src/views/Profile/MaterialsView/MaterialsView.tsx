import React from 'react';
import { useSelector } from 'react-redux';
import { IExpert } from '../../../old/lib/types';
import { selectAuthorities } from '../../../models/authorities';
// import MaterialsDraft from './MaterialsDraft';
// import MaterialsPublished from './MaterialsPublished';
import AdminTable from '../AdminTable/AdminTable';
import { AuthorTable } from './AuthorTable';

export interface IExpertProfileViewProps {
  expert: IExpert;
}

export const MaterialsView: React.FC<IExpertProfileViewProps> = ({
  expert,
}) => {
  const authorities = useSelector(selectAuthorities);
  const isAdmin = authorities.data?.includes('SET_IMPORTANCE');

  return isAdmin ? <AdminTable /> : <AuthorTable />;
};
