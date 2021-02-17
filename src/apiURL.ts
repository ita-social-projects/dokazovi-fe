export const BASE_URL = 'https://dokazovi-be.herokuapp.com/api';
export const ANDREW_URL = 'http://2efd903499b4.ngrok.io/api';

const { origin } = window.location;
export const OAUTH2_REDIRECT_URI = `${origin}/oauth2/redirect`;

export const FB_AUTH_URL = `${ANDREW_URL}/oauth2/authorize/facebook?redirect_uri=${OAUTH2_REDIRECT_URI}`;
export const GOOGLE_AUTH_URL = `${ANDREW_URL}/oauth2/authorize/google?redirect_uri=${OAUTH2_REDIRECT_URI}`;
