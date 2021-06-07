export const BASE_URL = process.env.REACT_APP_BASE_URL;

const { origin } = window.location;
export const OAUTH2_REDIRECT_URI = `${origin}/oauth2/redirect`;

export const FB_AUTH_URL = `${BASE_URL}/oauth2/authorize/facebook?redirect_uri=${OAUTH2_REDIRECT_URI}`;
export const GOOGLE_AUTH_URL = `${BASE_URL}/oauth2/authorize/google?redirect_uri=${OAUTH2_REDIRECT_URI}`;
