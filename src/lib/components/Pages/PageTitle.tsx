import React, { useEffect } from 'react';
import appTitle from '../../constants/appTitle';

export interface IPageTitleProps {
  title?: string;
}

const PageTitle: React.FC<IPageTitleProps> = ({ title }) => {
  const newTitle = title ? `${appTitle} | ${title}` : appTitle;

  useEffect(() => {
    document.title = newTitle;
  }, [title]);

  return null;
};

export default PageTitle;
