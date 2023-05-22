export function decodeToken(token: string) {
  try {
    if (token.split('.').length !== 3 || typeof token !== 'string') {
      return null;
    }

    const payload = token.split('.')[1];
    const padding = '='.repeat((4 - (payload.length % 4)) % 4);
    const base64 = payload.replace('-', '+').replace('_', '/') + padding;
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          // return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          return `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`;
        })
        .join('')
    );
    const decoded = JSON.parse(jsonPayload);
    return decoded;
  } catch (error) {
    return null;
  }
};

export function isTokenExpired(token: string) {
  const decodedToken = decodeToken(token);

  if (decodedToken && decodedToken.exp) {
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp);
    return expirationDate.valueOf() < new Date().valueOf();
  }

  return true;
};
