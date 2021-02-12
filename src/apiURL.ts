/* eslint-disable prefer-template */
// export const BASE_URL = 'https://dokazovi-be.herokuapp.com/api';
export const BASE_URL = 'https://64c39cf99369.ngrok.io/api';

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect';
export const ACCESS_TOKEN_SOCIAL = 'ACCESS_TOKEN_SOCIAL';

export const GOOGLE_AUTH_URL =
  BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL =
  BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
