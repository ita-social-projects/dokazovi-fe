import React, { useEffect } from 'react';
import appTitle from 'old/lib/constants/appTitle';

export interface IPageTitleProps {
  title?: string;
}

export const PageTitle: React.FC<IPageTitleProps> = ({ title }) => {
  const newTitle =
    title && title !== appTitle ? `${appTitle} | ${title}` : appTitle;

  useEffect(() => {
    document.title = newTitle;
  }, [title]);

  return null;
};
