import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import appTitle from '../constants/appTitle';

export interface IPageTitleComponentProps {
  title?: string;
}

const PageTitleComponent: React.FC<IPageTitleComponentProps> = ({ title }) => {
  return (
    <HelmetProvider>
      <Helmet>
        {/* add prefix if title passed or return only prefix
      e.g. Dokazovi | COVID-19 */}
        <title>{title ? `${appTitle} | ${title}` : appTitle}</title>
      </Helmet>
    </HelmetProvider>
  );
};

export default PageTitleComponent;
