import React from 'react';

export interface IRouteConfig {
  component: React.ComponentType;
  path: string | string[];
  key: string;
  exact?: boolean;
  private?: boolean;
  useRender?: boolean;
}
