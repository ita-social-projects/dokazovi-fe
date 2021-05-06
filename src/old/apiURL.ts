export const BASE_URL = 'https://dokazovi-be.herokuapp.com/api';
// export const BASE_URL = 'http://localhost:8080/api';

const { origin } = window.location;
export const OAUTH2_REDIRECT_URI = `${origin}/oauth2/redirect`;

export const FB_AUTH_URL = `${BASE_URL}/oauth2/authorize/facebook?redirect_uri=${OAUTH2_REDIRECT_URI}`;
export const GOOGLE_AUTH_URL = `${BASE_URL}/oauth2/authorize/google?redirect_uri=${OAUTH2_REDIRECT_URI}`;
