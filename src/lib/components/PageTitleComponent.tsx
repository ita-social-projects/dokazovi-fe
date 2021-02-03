import React from 'react';
import { Helmet } from 'react-helmet';
import appTitle from '../constants/appTitle';

export interface IPageTitleComponentProps {
  title?: string;
}

const PageTitleComponent: React.FC<IPageTitleComponentProps> = ({ title }) => {
  return (
    <Helmet>
      {/* add prefix if title passed or return only prefix
      e.g. Dokazovi | COVID-19 */}
      <title>{title ? `${appTitle} | ${title}` : appTitle}</title>
    </Helmet>
  );
};

export default PageTitleComponent;
