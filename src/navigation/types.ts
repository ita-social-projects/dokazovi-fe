export interface IRouteConfig {
  component: React.ComponentType;
  path: string;
  key: string;
  exact?: boolean;
  private?: boolean;
}
