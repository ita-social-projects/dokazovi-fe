import ReactGA from 'react-ga';

export const setGALocation = (window: Window): void => {
  ReactGA.pageview(window.location.pathname + window.location.search);
};
